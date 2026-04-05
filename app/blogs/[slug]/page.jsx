import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, Tag, Calendar } from "lucide-react";
import { Montserrat } from "next/font/google";
import LikeButton from "@/app/components/LikeButton";
import CommentSection from "@/app/components/CommentSection";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const categoryColors = {
  Technology:    "bg-blue-50 text-blue-700 border border-blue-200",
  "Career Tips": "bg-[#D9FFA5] text-[#090D24] border border-[#090D24]/20",
  Tutorials:     "bg-purple-50 text-purple-700 border border-purple-200",
  News:          "bg-orange-50 text-orange-700 border border-orange-200",
  Other:         "bg-slate-50 text-slate-600 border border-slate-200",
};

async function getBlog(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
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
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`min-h-screen bg-white ${montserrat.className}`}>
      
      {/* ── Top Navigation ── */}
      <div className="max-w-[860px] mx-auto px-6 pt-24 pb-8 md:pt-32">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#090D24] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>

        {/* ── Article Header ── */}
        <div className="mb-10">
          <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-6 ${categoryColors[blog.category] || categoryColors.Other}`}>
            {blog.category}
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black text-[#090D24] leading-[1.2] mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center text-xs font-black text-[#090D24]">
                {blog.author?.[0]?.toUpperCase()}
              </div>
              <span className="font-bold text-[#090D24]">{blog.author}</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-slate-400" />
              {formattedDate}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-slate-400" />
              {blog.readTime} min read
            </span>
          </div>
        </div>

        {/* ── Cover Image ── */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-12 border border-slate-100 shadow-sm bg-slate-50">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-6xl font-black text-slate-300">
                {blog.title?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* ── Article Content ── */}
        <article
          className="blog-content prose prose-slate max-w-none md:prose-lg prose-headings:text-[#090D24] prose-a:text-blue-600 mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* ── Tags ── */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 py-8 border-b border-slate-100">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-full hover:bg-slate-100 cursor-default transition-colors"
              >
                <Tag size={12} className="text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Author / Like Footer ── */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center text-xl font-black text-[#090D24] flex-shrink-0">
              {blog.author?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Written By</p>
              <p className="text-lg font-black text-[#090D24]">{blog.author}</p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <LikeButton blogId={blog._id} initialLikes={blog.likes || []} size="large" />
          </div>
        </div>

        {/* ── Comments ── */}
        <div className="pt-8 pb-20">
          <CommentSection blogId={blog._id} initialComments={blog.comments || []} />
        </div>

      </div>
    </div>
  );
}
