import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Clock } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const categoryColors = {
  Technology:   "bg-blue-100 text-blue-700 border border-blue-200",
  "Career Tips":"bg-[#D9FFA5] text-[#090D24] border border-[#090D24]/20",
  Tutorials:    "bg-purple-100 text-purple-700 border border-purple-200",
  News:         "bg-orange-100 text-orange-700 border border-orange-200",
  Other:        "bg-slate-100 text-slate-600 border border-slate-200",
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
    <Link href={href} className={`group block ${montserrat.className}`}>
      <article className="bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">

        {/* Cover image */}
        <div className="relative w-full h-52 bg-[#f8ffec] overflow-hidden flex-shrink-0">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#090D24] to-[#1a2456] flex items-center justify-center">
              <span className="text-5xl font-black text-[#D9FFA5] opacity-20">
                {title?.[0]?.toUpperCase()}
              </span>
            </div>
          )}

          {/* Category badge */}
          <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[category] || categoryColors.Other}`}>
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h2 className="text-base md:text-[1.05rem] font-bold text-[#090D24] leading-snug mb-2 line-clamp-2 group-hover:underline underline-offset-2 transition-all">
            {title}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-5 font-medium">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#090D24]/10 mt-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center text-xs font-black text-[#090D24] flex-shrink-0">
                {author?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-[#090D24] leading-tight">{author}</p>
                <p className="text-xs text-slate-400 font-medium">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
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
