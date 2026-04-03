import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Clock, Tag } from "lucide-react";

const categoryColors = {
  Technology: "bg-blue-100 text-blue-700",
  "Career Tips": "bg-green-100 text-green-700",
  Tutorials: "bg-purple-100 text-purple-700",
  News: "bg-orange-100 text-orange-700",
  Other: "bg-slate-100 text-slate-600",
};

export default function BlogCard({ blog }) {
  const {
    _id,
    slug,
    title,
    excerpt,
    coverImage,
    category,
    author,
    readTime,
    likes = [],
    createdAt,
  } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const href = `/blogs/${slug || _id}`;

  return (
    <Link href={href} className="group block">
      <article className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Cover image */}
        <div className="relative w-full h-48 bg-slate-100 overflow-hidden flex-shrink-0">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#090D24] to-[#1a2456] flex items-center justify-center">
              <span className="text-4xl font-black text-[#D9FFA5] opacity-30">
                {title?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          {/* Category badge */}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] || categoryColors.Other}`}>
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="text-base font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#090D24] transition-colors">
            {title}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#D9FFA5] border border-[#090D24] flex items-center justify-center text-xs font-bold text-[#090D24]">
                {author?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 leading-tight">{author}</p>
                <p className="text-xs text-slate-400">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Heart size={12} className="fill-red-400 text-red-400" />
                {likes.length}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
