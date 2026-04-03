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
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#090D24] via-[#111832] to-[#1a2456] text-white pt-32 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <BookOpen size={14} className="text-[#D9FFA5]" />
            <span className="text-xs font-semibold tracking-wide text-[#D9FFA5]">ZERO2LAB BLOG</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Insights & <span className="text-[#D9FFA5]">Ideas</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Explore articles on technology, career growth, tutorials, and the latest in the tech world.
          </p>
          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 text-sm text-slate-800 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D9FFA5] placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                category === cat
                  ? "bg-[#090D24] text-white shadow-md scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            {loading ? "Loading..." : `${pagination.total} article${pagination.total !== 1 ? "s" : ""} found`}
          </p>
          {pagination.totalPages > 1 && (
            <p className="text-sm text-slate-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          )}
        </div>

        {/* Blog grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#090D24]" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">No articles found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search or category filter.</p>
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
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => fetchBlogs(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => fetchBlogs(n)}
                className={`w-9 h-9 text-sm font-bold rounded-xl border transition ${
                  pagination.page === n
                    ? "bg-[#090D24] text-white border-[#090D24] shadow"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => fetchBlogs(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
