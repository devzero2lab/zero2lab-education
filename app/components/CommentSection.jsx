"use client";
import React, { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { MessageSquare, Trash2, Send, LogIn } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={20} className="text-slate-700" />
        <h2 className="text-xl font-bold text-slate-900">
          Comments <span className="text-base font-normal text-slate-400">({comments.length})</span>
        </h2>
      </div>

      {/* Comment form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "You"}
                  width={38}
                  height={38}
                  className="rounded-full border border-slate-200"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#D9FFA5] border border-[#090D24] flex items-center justify-center text-sm font-bold text-[#090D24]">
                  {user?.firstName?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                maxLength={1000}
                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#090D24] focus:border-transparent bg-white placeholder-slate-400 resize-none transition"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{text.length}/1000</span>
                <button
                  type="submit"
                  disabled={submitting || !text.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#090D24] rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                  {submitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Sign in to join the conversation</p>
            <p className="text-xs text-slate-400 mt-0.5">Share your thoughts and insights</p>
          </div>
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#090D24] rounded-xl hover:bg-black transition-colors">
              <LogIn size={14} />
              Sign In
            </button>
          </SignInButton>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-5">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No comments yet. Be the first!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const canDelete = isSignedIn && (user?.id === comment.userId);
            return (
              <div key={comment._id} className="flex gap-3 group">
                <div className="flex-shrink-0">
                  {comment.avatarUrl ? (
                    <Image
                      src={comment.avatarUrl}
                      alt={comment.name}
                      width={36}
                      height={36}
                      className="rounded-full border border-slate-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#D9FFA5] border border-[#090D24] flex items-center justify-center text-sm font-bold text-[#090D24]">
                      {comment.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">{comment.name}</span>
                        <span className="text-xs text-slate-400">{timeAgo(comment.createdAt)}</span>
                      </div>
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(comment._id)}
                          disabled={deletingId === comment._id}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                          title="Delete comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{comment.text}</p>
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
