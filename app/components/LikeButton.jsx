"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { toast } from "sonner";

export default function LikeButton({ blogId, initialLikes = [], size = "default" }) {
  const { user, isSignedIn } = useUser();
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const isLiked = isSignedIn && likes.includes(user?.id);

  const handleLike = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to like posts");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}/like`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.liked) {
        setLikes((prev) => [...prev, user.id]);
      } else {
        setLikes((prev) => prev.filter((id) => id !== user.id));
      }
    } catch (err) {
      toast.error("Failed to like post");
    } finally {
      setLoading(false);
    }
  };

  const iconSize = size === "large" ? 22 : 18;
  const textSize = size === "large" ? "text-base" : "text-sm";

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full font-semibold
        transition-all duration-200 select-none
        ${isLiked
          ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
          : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100"
        }
        ${loading ? "opacity-60 cursor-not-allowed scale-95" : "hover:scale-105 active:scale-95"}
      `}
      title={isSignedIn ? (isLiked ? "Unlike" : "Like") : "Sign in to like"}
    >
      <Heart
        size={iconSize}
        className={`transition-all duration-200 ${isLiked ? "fill-red-500 text-red-500 scale-110" : ""}`}
      />
      <span className={`${textSize} tabular-nums`}>{likes.length}</span>
    </button>
  );
}
