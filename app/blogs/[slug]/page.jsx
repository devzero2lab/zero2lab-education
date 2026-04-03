import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, Tag, User, Calendar } from "lucide-react";
import { Montserrat } from "next/font/google";
import LikeButton from "@/app/components/LikeButton";
import CommentSection from "@/app/components/CommentSection";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const categoryColors = {
  Technology: "bg-blue-100 text-blue-700",
  "Career Tips": "bg-green-100 text-green-700",
  Tutorials: "bg-purple-100 text-purple-700",
  News: "bg-orange-100 text-orange-700",
  Other: "bg-slate-100 text-slate-600",
};

async function getBlog(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog) return { title: "Blog Not Found | zero2lab" };
  return {
    title: `${blog.title} | zero2lab Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog || !blog.published) notFound();

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`min-h-screen bg-[#F8F9FB] ${montserrat.className}`}>
      {/* Cover image hero */}
      <div className="relative w-full h-[340px] md:h-[440px] overflow-hidden bg-[#090D24]">
        {blog.coverImage ? (
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover opacity-80" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#090D24] via-[#1a2456] to-[#0f1a3a]" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D24] via-[#090D24]/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            href="/blogs"
            className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Blogs
          </Link>
        </div>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-[900px] mx-auto w-full">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${categoryColors[blog.category] || categoryColors.Other}`}>
            {blog.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[860px] mx-auto px-6 py-10">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Article content */}
        <article
          className="blog-content prose prose-slate max-w-none text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Action bar */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center text-sm font-black text-[#090D24]">
              {blog.author?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{blog.author}</p>
              <p className="text-xs text-slate-400">{formattedDate}</p>
            </div>
          </div>
          <LikeButton blogId={blog._id} initialLikes={blog.likes || []} size="large" />
        </div>

        {/* Comments */}
        <CommentSection blogId={blog._id} initialComments={blog.comments || []} />
      </div>
    </div>
  );
}
