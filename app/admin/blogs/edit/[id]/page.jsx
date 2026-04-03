"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Trash2, Eye, EyeOff, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";

const TipTapEditor = dynamic(() => import("@/app/components/TipTapEditor"), { ssr: false });

const CATEGORIES = ["Technology", "Career Tips", "Tutorials", "News", "Other"];

const inputClass = "w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white placeholder-slate-400 transition";
const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

function generateSlug(title) {
  return title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Technology",
    tags: "",
    author: "zero2lab Team",
    published: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          category: data.category || "Technology",
          tags: (data.tags || []).join(", "),
          author: data.author || "zero2lab Team",
          published: data.published || false,
        });
        setCoverImage(data.coverImage || "");
        setContent(data.content || "");
      } catch {
        toast.error("Failed to load blog post");
        router.push("/admin/blogs");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || content === "<p></p>") {
      toast.error("Please write some content.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        content,
        coverImage,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="animate-spin text-indigo-500" />
        <span className="ml-3 text-slate-500">Loading blog...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blogs" className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
            <FileText size={18} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Edit Blog Post</h1>
            <p className="text-xs text-slate-500 truncate max-w-[300px]">{form.title}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">Post Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Title *</label>
              <input type="text" name="title" value={form.title} onChange={handleTitleChange} className={inputClass} required />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Slug *</label>
              <div className="flex gap-2">
                <input type="text" name="slug" value={form.slug} onChange={handleChange} className={inputClass} required />
                <button type="button" onClick={() => setForm((p) => ({ ...p, slug: generateSlug(p.title) }))} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-colors">
                  <Sparkles size={13} /> Auto
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Excerpt * <span className="text-xs text-slate-400 font-normal">(max 300 chars)</span></label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} className={inputClass} rows={2} maxLength={300} required />
              <p className="text-xs text-right text-slate-400 mt-1">{form.excerpt.length}/300</p>
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input type="text" name="author" value={form.author} onChange={handleChange} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Tags <span className="text-xs text-slate-400 font-normal">(comma-separated)</span></label>
              <input type="text" name="tags" value={form.tags} onChange={handleChange} className={inputClass} placeholder="javascript, react, ..." />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">Cover Image</h2>
          <UploadButton
            endpoint="blogImageUploader"
            onClientUploadComplete={(res) => { if (res?.[0]?.url) { setCoverImage(res[0].url); toast.success("Image updated!"); } }}
            onUploadError={() => toast.error("Image upload failed")}
            appearance={{ button: { padding: "0.6rem 1.2rem", fontSize: "0.875rem", fontWeight: "600", background: "linear-gradient(to right, #4F46E5, #6366f1)", color: "#FFFFFF", borderRadius: "0.75rem" } }}
          />
          {coverImage && (
            <div className="relative mt-4 inline-block">
              <Image src={coverImage} width={300} height={180} alt="Cover" className="rounded-xl shadow-sm object-cover" />
              <button type="button" onClick={() => setCoverImage("")} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">Content *</h2>
          {content !== undefined && (
            <TipTapEditor content={content} onChange={setContent} />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
                className={`w-11 h-6 rounded-full transition-colors duration-200 flex items-center ${form.published ? "bg-green-500" : "bg-slate-200"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${form.published ? "translate-x-5.5 mx-5" : "mx-0.5"}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  {form.published ? <><Eye size={14} className="text-green-500" /> Published</> : <><EyeOff size={14} className="text-slate-400" /> Draft</>}
                </p>
                <p className="text-xs text-slate-400">{form.published ? "Visible to all users" : "Only admins can see this"}</p>
              </div>
            </label>
            <div className="flex gap-3">
              <Link href="/admin/blogs" className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#090D24] hover:bg-black rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? "Saving..." : "Update Post"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
