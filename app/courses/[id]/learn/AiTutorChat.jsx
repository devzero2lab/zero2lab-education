"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { FiMessageCircle, FiX, FiSend, FiZap, FiAlertCircle, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import "./ai-tutor-chat.css";

export default function AiTutorChat({ courseId, currentDay, courseName, lessonNotes }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [credits, setCredits] = useState(null);
  const [creditsLoaded, setCreditsLoaded] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Reset conversation when lesson changes
  useEffect(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, [currentDay]);

  // Fetch credits when chat opens
  useEffect(() => {
    if (isOpen && user) {
      fetchCredits();
    }
  }, [isOpen, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Synthesize a gentle "pop/bell" sound Web Audio API
  const playOpenSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      // Ensure context is running (fixes some browser policies)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // Gentle double-tone simulation
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.05); // Up to A6
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      playOpenSound();
    }
    setIsOpen(!isOpen);
    // Reset full screen if closed
    if (isOpen) setIsFullScreen(false);
  };

  const fetchCredits = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/ai-tutor/credits`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("[AI Tutor] Credits fetched:", data.credits);
        setCredits(data.credits ?? 0);
        setCreditsLoaded(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error("[AI Tutor] Credits fetch failed:", res.status, errData);
        // If 401/404, don't block — set loaded with 0 so user sees the issue clearly
        setCreditsLoaded(true);
      }
    } catch (err) {
      console.error("[AI Tutor] Failed to fetch credits:", err);
      setCreditsLoaded(true);
    }
  };

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Add placeholder for assistant response
    setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);
    setIsStreaming(true);

    try {
      const res = await fetch(`${apiUrl}/api/ai-tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          courseId,
          lessonDay: currentDay,
          message: userMessage,
          conversationId,
        }),
      });

      // Handle non-streaming error responses
      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch {
          errorData = { error: "Something went wrong" };
        }
        console.error("[AI Tutor] API error:", res.status, errorData);
        setMessages((prev) => prev.slice(0, -1)); // Remove placeholder
        setError(errorData.error || "Something went wrong");

        if (errorData.noCredits) {
          // Re-fetch credits to get accurate value instead of blindly setting 0
          await fetchCredits();
        }
        if (errorData.flagged) {
          // Show the guardrail message as an assistant message
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: errorData.error, flagged: true },
          ]);
        }
        setIsStreaming(false);
        return;
      }

      // Parse SSE stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.error) {
              setError(data.error);
              break;
            }

            if (data.content) {
              fullContent += data.content;
              setMessages((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (updated[lastIdx]?.role === "assistant") {
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    content: fullContent,
                    streaming: true,
                  };
                }
                return updated;
              });
            }

            if (data.done) {
              setConversationId(data.conversationId);
              setCredits(data.creditsRemaining);
              // Mark streaming as done
              setMessages((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (updated[lastIdx]?.role === "assistant") {
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    streaming: false,
                  };
                }
                return updated;
              });
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => prev.slice(0, -1));
      setError("Network error. Please try again.");
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, courseId, currentDay, conversationId, apiUrl]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-like rendering (bold, code, lists)
  const renderContent = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, i) => {
      // Code blocks
      if (line.startsWith("```")) return null;

      // Bold
      let processed = line.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="ait-bold">$1</strong>'
      );
      // Inline code
      processed = processed.replace(
        /`([^`]+)`/g,
        '<code class="ait-code">$1</code>'
      );
      // List items
      if (processed.startsWith("- ") || processed.startsWith("* ")) {
        processed = `<span class="ait-list-marker">•</span> ${processed.slice(2)}`;
      }
      // Numbered list
      const numMatch = processed.match(/^(\d+)\.\s/);
      if (numMatch) {
        processed = `<span class="ait-list-marker">${numMatch[1]}.</span> ${processed.slice(numMatch[0].length)}`;
      }

      return (
        <span key={i} className="ait-line" dangerouslySetInnerHTML={{ __html: processed || "&nbsp;" }} />
      );
    });
  };

  return (
    <>
      {/* ── Floating Action Button ── */}
      <button
        id="ai-tutor-fab"
        onClick={toggleChat}
        className={`ait-fab ${isOpen ? "ait-fab--open" : ""}`}
        aria-label={isOpen ? "Close AI Tutor" : "Open AI Tutor"}
      >
        <span className="ait-fab__icon">
          {isOpen ? <FiX size={22} /> : <HiSparkles size={22} />}
        </span>
        {!isOpen && credits !== null && credits > 0 && (
          <span className="ait-fab__badge">{credits}</span>
        )}
        {!isOpen && <span className="ait-fab__pulse" />}
      </button>

      {/* ── Chat Panel ── */}
      <div className={`ait-panel ${isOpen ? "ait-panel--open" : ""} ${isFullScreen ? "ait-panel--fullscreen" : ""}`}>
        {/* Header */}
        <div className="ait-header">
          <div className="ait-header__left">
            <div className="ait-header__avatar">
              <HiSparkles size={16} />
            </div>
            <div>
              <h3 className="ait-header__title">AI Tutor</h3>
              <p className="ait-header__subtitle">Day {currentDay} • {courseName}</p>
            </div>
          </div>
          <div className="ait-header__right">
            {credits !== null && (
              <div className={`ait-credits ${credits <= 5 ? "ait-credits--low" : ""}`}>
                <FiZap size={12} />
                <span>{credits}</span>
              </div>
            )}
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)} 
              className="ait-header__btn ait-header__fullscreen" 
              aria-label="Toggle Fullscreen"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
            </button>
            <button onClick={toggleChat} className="ait-header__btn ait-header__close" aria-label="Close">
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="ait-messages">
          {messages.length === 0 && (
            <div className="ait-empty">
              <div className="ait-empty__icon">
                <HiSparkles size={28} />
              </div>
              <h4 className="ait-empty__title">Hi {user?.firstName}! 👋</h4>
              <p className="ait-empty__desc">
                I&apos;m your AI Tutor for <strong>Day {currentDay}</strong>. Ask me anything about this lesson!
              </p>
              <div className="ait-empty__hints">
                <button onClick={() => { setInput("මේ lesson එකේ ප්‍රධාන concepts මොනවාද?"); }} className="ait-hint">
                  🇱🇰 ප්‍රධාන concepts
                </button>
                <button onClick={() => { setInput("Can you explain this topic in simple terms?"); }} className="ait-hint">
                  🗣️ Explain simply
                </button>
                <button onClick={() => { setInput("Give me a practice example for this lesson"); }} className="ait-hint">
                  📝 Practice example
                </button>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`ait-msg ${msg.role === "user" ? "ait-msg--user" : "ait-msg--assistant"} ${
                msg.flagged ? "ait-msg--flagged" : ""
              }`}
            >
              {msg.role === "assistant" && (
                <div className="ait-msg__avatar">
                  <HiSparkles size={12} />
                </div>
              )}
              <div className="ait-msg__bubble">
                {msg.role === "assistant" ? (
                  <div className="ait-msg__content">
                    {renderContent(msg.content)}
                    {msg.streaming && <span className="ait-cursor" />}
                  </div>
                ) : (
                  <div className="ait-msg__content">{msg.content}</div>
                )}
              </div>
            </div>
          ))}

          {/* Error message */}
          {error && !messages.some((m) => m.flagged) && (
            <div className="ait-error">
              <FiAlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="ait-input-area">
          {!creditsLoaded ? (
            <div className="ait-no-credits" style={{ background: '#f0f4f8', borderColor: '#cbd5e1', color: '#64748b' }}>
              <FiZap size={14} className="animate-pulse" />
              <span>Loading credits...</span>
            </div>
          ) : creditsLoaded && credits !== null && credits <= 0 ? (
            <div className="ait-no-credits">
              <FiZap size={14} />
              <span>No credits remaining. Contact admin for more.</span>
            </div>
          ) : (
            <div className="ait-input-wrap">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about this lesson..."
                className="ait-input"
                rows={1}
                maxLength={500}
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="ait-send"
                aria-label="Send message"
              >
                <FiSend size={16} />
              </button>
            </div>
          )}
          <p className="ait-footer-text">
            Powered by Zero2Lab AI • {input.length}/500
          </p>
        </div>
      </div>
    </>
  );
}
