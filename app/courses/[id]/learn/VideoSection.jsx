"use client";
import React, { useState } from "react";
import SecureVideoPlayerWrapper from "@/app/components/SecureVideoPlayerWrapper";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiBookOpen } from "react-icons/fi";

// ─── Enhanced Markdown-like Renderer ──────────────────────────────────────────
function formatInline(text) {
  // Links
  let html = text.replace(
    /https?:\/\/[^\s]+/g,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-medium underline underline-offset-2 hover:text-blue-800 transition-colors break-all">${url}</a>`
  );
  // Bold
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-gray-900">$1</strong>'
  );
  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono text-blue-700">$1</code>'
  );
  return html;
}

function LessonContent({ notes }) {
  if (!notes) return null;

  const lines = notes.split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${i}`} className="my-3 rounded-lg overflow-hidden border border-gray-200">
            {codeLang && (
              <div className="px-3 py-1 bg-gray-100 text-[10px] font-mono text-gray-500 uppercase border-b border-gray-200">
                {codeLang}
              </div>
            )}
            <pre className="px-4 py-3 bg-gray-50 overflow-x-auto text-xs font-mono leading-relaxed text-gray-800">
              {codeLines.join("\n")}
            </pre>
          </div>
        );
        codeLines = [];
        codeLang = "";
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Heading 1
    if (line.startsWith("# ")) {
      elements.push(
        <h2 key={i} className="text-lg font-bold text-gray-900 mt-5 mb-2 first:mt-0 border-b border-gray-100 pb-1">
          {line.slice(2)}
        </h2>
      );
      continue;
    }
    // Heading 2
    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-gray-800 mt-4 mb-1.5">
          {line.slice(3)}
        </h3>
      );
      continue;
    }
    // Heading 3
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-gray-700 mt-3 mb-1">
          {line.slice(4)}
        </h4>
      );
      continue;
    }
    // Bullet list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const text = line.slice(2);
      elements.push(
        <div key={i} className="flex gap-2 text-sm text-gray-700 ml-3 mb-1 leading-relaxed">
          <span className="text-gray-400 shrink-0 mt-1">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
        </div>
      );
      continue;
    }
    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s/);
    if (numMatch) {
      const text = line.slice(numMatch[0].length);
      elements.push(
        <div key={i} className="flex gap-2 text-sm text-gray-700 ml-3 mb-1 leading-relaxed">
          <span className="text-gray-400 shrink-0 font-mono text-xs mt-0.5">{numMatch[1]}.</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
        </div>
      );
      continue;
    }
    // Empty line
    if (!line.trim()) {
      elements.push(<div key={i} className="h-2" />);
      continue;
    }
    // Regular paragraph
    elements.push(
      <p
        key={i}
        className="text-sm text-gray-700 mb-1.5 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(line) }}
      />
    );
  }

  return <div className="space-y-0">{elements}</div>;
}

export default function VideoSection({
  currentLesson,
  courseId,
  userId,
  completedLessons = [],
  onLessonComplete,
  cookiesReady,
  isAiTutorOpen,
}) {
  const [isMarking, setIsMarking] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white min-h-[50vh]">
        <div className="text-center max-w-sm">
          <FaPlayCircle className="w-12 h-12 text-gray-200 mb-3 mx-auto" />
          <p className="text-lg font-semibold text-gray-900">No lesson selected</p>
          <p className="mt-1 text-sm text-gray-500">Select a lesson from the sidebar to continue learning.</p>
        </div>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(currentLesson.day);
  const proxiedVideoUrl = `/api/proxy?videoUrl=${encodeURIComponent(currentLesson.videoUrl)}`;
  const hasNotes = currentLesson.notes && currentLesson.notes.trim().length > 0;

  const handleMarkComplete = async () => {
    if (isCompleted || isMarking) return;
    setIsMarking(true);
    try {
      await onLessonComplete(currentLesson.day);
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {/* Video Player Section */}
      <div className="w-full bg-slate-50/50 border-b border-gray-100 flex items-center justify-center p-0 sm:p-2 md:p-4">
        <div className="w-full max-w-6xl mx-auto shadow-2xl rounded-none sm:rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white">
          <div className="aspect-video w-full overflow-hidden">
            <SecureVideoPlayerWrapper
              key={currentLesson.day}
              videoUrl={proxiedVideoUrl}
              courseId={courseId}
              cookiesReady={cookiesReady}
              isAiTutorOpen={isAiTutorOpen}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {/* Title + Mark Complete */}
        <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#090D24]">
            Day {currentLesson.day} Lesson
          </h1>

          {/* Mark as Watched Button */}
          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D9FFA5] text-[#090D24] border-2 border-[#090D24] rounded-xl text-sm font-bold select-none">
              <FaCheckCircle className="w-4 h-4 text-[#090D24]" />
              Lesson Completed
            </div>
          ) : (
            <button
              onClick={handleMarkComplete}
              disabled={isMarking}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                isMarking
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-wait"
                  : "bg-[#090D24] text-white border-[#090D24] hover:bg-[#D9FFA5] hover:text-[#090D24] hover:shadow-[3px_3px_0_0_#090D24] active:translate-x-[1px] active:translate-y-[1px]"
              }`}
            >
              {isMarking ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaCheckCircle className="w-3.5 h-3.5" />
                  Mark as Watched
                </>
              )}
            </button>
          )}
        </div>

        {/* Lesson Notes — Collapsible */}
        <div className="w-full break-words overflow-hidden">
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <FiBookOpen className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Lesson Content
              </h2>
              {hasNotes && (
                <span className="text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                  Available
                </span>
              )}
            </div>
            {notesOpen ? (
              <FiChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            ) : (
              <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            )}
          </button>

          {notesOpen && (
            <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 sm:p-6">
              {hasNotes ? (
                <LessonContent notes={currentLesson.notes} />
              ) : (
                <div className="text-center py-6">
                  <FiBookOpen className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 italic text-sm">
                    No content available for this lesson yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

