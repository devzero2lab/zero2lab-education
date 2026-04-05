"use client";
import React, { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { MessageSquare, Trash2, Send, LogIn } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function CommentSection({ blogId, initialComments = [] }) {
  const { user, isSignedIn } = useUser();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.fullName || user?.firstName || "Anonymous",
          avatarUrl: user?.imageUrl || "",
          text: text.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setComments((prev) => [...prev, data]);
      setText("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    setDeletingId(commentId);
    try {
      const res = await fetch(`/api/blogs/${blogId}/comment?commentId=${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={`mt-14 ${montserrat.className}`}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-8 h-8 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center">
          <MessageSquare size={15} className="text-[#090D24]" />
        </div>
        <h2 className="text-xl font-black text-[#090D24]">
          Comments{" "}
          <span className="text-base font-medium text-slate-400">({comments.length})</span>
        </h2>
      </div>

      {/* Comment form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "You"}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#090D24]/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center text-sm font-black text-[#090D24]">
                  {user?.firstName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                maxLength={1000}
                className="w-full px-5 py-3.5 text-sm border-2 border-[#090D24]/15 rounded-2xl focus:outline-none focus:border-[#090D24] bg-white placeholder-slate-400 resize-none transition-colors font-medium"
              />
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-xs text-slate-400 font-medium">{text.length}/1000</span>
                <button
                  type="submit"
                  disabled={submitting || !text.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#090D24] rounded-full hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                  {submitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-6 bg-[#f8ffec] border-2 border-[#090D24]/15 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#090D24]">Sign in to join the conversation</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Share your thoughts and insights</p>
          </div>
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#090D24] rounded-full hover:bg-black transition-all shadow-md active:scale-95">
              <LogIn size={14} />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-14">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center">
              <MessageSquare size={24} className="text-[#090D24]" />
            </div>
            <p className="text-sm font-bold text-[#090D24] mb-1">No comments yet</p>
            <p className="text-xs text-slate-400 font-medium">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const canDelete = isSignedIn && (user?.id === comment.userId);
            return (
              <div key={comment._id} className="flex gap-3 group">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {comment.avatarUrl ? (
                    <Image
                      src={comment.avatarUrl}
                      alt={comment.name}
                      width={38}
                      height={38}
                      className="rounded-full border-2 border-[#090D24]/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center text-sm font-black text-[#090D24]">
                      {comment.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white border-2 border-[#090D24]/10 rounded-2xl px-5 py-4 shadow-sm hover:border-[#090D24]/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-[#090D24]">{comment.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{timeAgo(comment.createdAt)}</span>
                      </div>
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(comment._id)}
                          disabled={deletingId === comment._id}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50"
                          title="Delete comment"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{comment.text}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
