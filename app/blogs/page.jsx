"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BlogCard from "@/app/components/BlogCard";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const CATEGORIES = ["All", "Technology", "Career Tips", "Tutorials", "News", "Other"];
const ITEMS_PER_PAGE = 9;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchBlogs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(ITEMS_PER_PAGE),
        ...(category !== "All" && { category }),
        ...(debouncedSearch && { search: debouncedSearch }),
      });
      const res = await fetch(`/api/blogs?${params}`);
      const data = await res.json();
      setBlogs(data.blogs || []);
      setPagination(data.pagination || { total: 0, page: 1, totalPages: 1 });
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch]);

  useEffect(() => { fetchBlogs(1); }, [fetchBlogs]);

  return (
    <div className={`min-h-screen bg-[#F8F9FB] ${montserrat.className}`}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-[#090D24] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D9FFA5]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <BookOpen size={13} className="text-[#D9FFA5]" />
            <span className="text-xs font-bold tracking-widest text-[#D9FFA5] uppercase">zero2lab Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Insights &amp; <span className="text-[#D9FFA5]">Ideas</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Explore articles on technology, career growth, tutorials, and the latest in the tech world.
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 text-sm text-slate-800 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D9FFA5] placeholder-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 active:scale-95 ${
                category === cat
                  ? "bg-[#090D24] text-white shadow-md scale-105 border-2 border-[#090D24]"
                  : "bg-white text-[#090D24] border-2 border-[#090D24]/20 hover:border-[#090D24] hover:bg-[#f8ffec]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-7">
          <p className="text-sm text-slate-500 font-medium">
            {loading ? "Loading..." : `${pagination.total} article${pagination.total !== 1 ? "s" : ""} found`}
          </p>
          {pagination.totalPages > 1 && (
            <p className="text-sm text-slate-500 font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          )}
        </div>

        {/* Blog grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={36} className="animate-spin text-[#090D24]" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center">
              <BookOpen size={32} className="text-[#090D24]" />
            </div>
            <h3 className="text-lg font-bold text-[#090D24] mb-2">No articles found</h3>
            <p className="text-slate-500 text-sm font-medium">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => fetchBlogs(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-[#090D24] bg-white border-2 border-[#090D24]/20 rounded-full hover:border-[#090D24] hover:bg-[#f8ffec] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => fetchBlogs(n)}
                className={`w-10 h-10 text-sm font-bold rounded-full border-2 transition-all active:scale-95 ${
                  pagination.page === n
                    ? "bg-[#090D24] text-white border-[#090D24] shadow-md"
                    : "bg-white text-[#090D24] border-[#090D24]/20 hover:border-[#090D24] hover:bg-[#f8ffec]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => fetchBlogs(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-[#090D24] bg-white border-2 border-[#090D24]/20 rounded-full hover:border-[#090D24] hover:bg-[#f8ffec] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
