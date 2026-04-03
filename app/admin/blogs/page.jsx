"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus, Search, FileText, Eye, EyeOff, Edit3, Trash2,
  Heart, MessageSquare, Calendar, ChevronLeft, ChevronRight,
  Globe, Lock, Tag,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 8;

const categoryColors = {
  Technology: "bg-blue-100 text-blue-700",
  "Career Tips": "bg-green-100 text-green-700",
  Tutorials: "bg-purple-100 text-purple-700",
  News: "bg-orange-100 text-orange-700",
  Other: "bg-slate-100 text-slate-600",
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?all=true&limit=200");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: `"${title}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Blog deleted");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const handleTogglePublish = async (id, currentState) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentState }),
      });
      if (!res.ok) throw new Error();
      toast.success(currentState ? "Blog saved as draft" : "Blog published!");
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, published: !currentState } : b))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Filter
  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && b.published) ||
      (filterStatus === "draft" && !b.published);
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.published).length,
    drafts: blogs.filter((b) => !b.published).length,
    totalLikes: blogs.reduce((acc, b) => acc + (b.likes?.length || 0), 0),
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <FileText size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Blog Management</h1>
            <p className="text-xs text-slate-500">{stats.total} posts total</p>
          </div>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#090D24] rounded-xl hover:bg-black transition-colors"
        >
          <Plus size={16} />
          New Blog Post
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Posts", value: stats.total, icon: FileText, color: "indigo" },
          { label: "Published", value: stats.published, icon: Globe, color: "green" },
          { label: "Drafts", value: stats.drafts, icon: Lock, color: "orange" },
          { label: "Total Likes", value: stats.totalLikes, icon: Heart, color: "red" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className={`w-8 h-8 rounded-lg bg-${color}-100 flex items-center justify-center mb-2`}>
              <Icon size={16} className={`text-${color}-600`} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["all", "published", "draft"].map((s) => (
              <button
                key={s}
                onClick={() => { setFilterStatus(s); setPage(1); }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                  filterStatus === s
                    ? "bg-[#090D24] text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Loading blogs...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="text-sm text-slate-400">
              {search || filterStatus !== "all" ? "No blogs match your filters." : "No blogs yet. Create your first one!"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Blog Post", "Category", "Status", "Likes", "Comments", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((blog) => (
                    <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3.5 max-w-[260px]">
                        <p className="text-sm font-semibold text-slate-800 truncate">{blog.title}</p>
                        <p className="text-xs text-slate-400 truncate">/blogs/{blog.slug}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[blog.category] || "bg-slate-100 text-slate-600"}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          blog.published
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {blog.published ? <Globe size={10} /> : <Lock size={10} />}
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <Heart size={13} className="text-red-400" />
                          {blog.likes?.length || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <MessageSquare size={13} className="text-blue-400" />
                          {blog.comments?.length || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar size={12} />
                          {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleTogglePublish(blog._id, blog.published)}
                            title={blog.published ? "Unpublish" : "Publish"}
                            className={`p-1.5 rounded-lg transition-colors ${
                              blog.published
                                ? "text-green-600 hover:bg-green-50"
                                : "text-slate-400 hover:bg-slate-100"
                            }`}
                          >
                            {blog.published ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <Link
                            href={`/admin/blogs/edit/${blog._id}`}
                            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={15} />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id, blog.title)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
                <p className="text-xs text-slate-500">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 text-xs font-semibold rounded-lg border transition ${
                        page === n
                          ? "bg-[#090D24] text-white border-[#090D24]"
                          : "border-slate-200 text-slate-600 hover:bg-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
