"use client";
import React, { useState } from "react";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

const inputClass =
  "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder-slate-400 transition";

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

function AddCoursePage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    uniqueName: "",
    type: "Live",
    description: "",
    image: "",
    level: "",
    duration: "",
    price: 0,
    discountPrice: 0,
    instructor: "",
    content: [],
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleUploadComplete = (res) => {
    if (res && res.length > 0) {
      const url = res[0]?.url;
      setUploadedImageUrl(url);
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("No file was uploaded.");
    }
  };

  const handleUploadError = (error) => {
    console.error("Upload failed", error);
    toast.error("Failed to upload the image.");
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload an image for the course.");
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(`${apiUrl}/api/courses/`, formData);
      toast.success("Course added successfully!");
      router.push("/admin/course");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add the course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/course"
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <BookOpen size={18} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Add New Course</h1>
            <p className="text-xs text-slate-500">Fill in the details below</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Course Name *</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="e.g. Machine Learning Fundamentals"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Unique Name (Slug) *</label>
              <input
                type="text"
                name="uniqueName"
                value={formData.uniqueName}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="e.g. machine-learning-fundamentals"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="Live">Live</option>
                <option value="Recorded">Recorded</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={inputClass}
                rows="4"
                placeholder="Brief description of the course..."
              />
            </div>
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">
            Pricing & Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Price (Rs.)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={inputClass}
                min="0"
              />
            </div>
            <div>
              <label className={labelClass}>Discount Price (Rs.)</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                className={inputClass}
                min="0"
              />
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="e.g. 8 weeks"
              />
            </div>
            <div>
              <label className={labelClass}>Instructor</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Instructor name"
              />
            </div>
          </div>
        </div>

        {/* Course Image */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">
            Course Image
          </h2>
          <UploadButton
            appearance={{
              button: {
                padding: "0.6rem 1.2rem",
                fontSize: "0.875rem",
                fontWeight: "600",
                background: "linear-gradient(to right, #4F46E5, #3B82F6)",
                color: "#FFFFFF",
                borderRadius: "0.75rem",
              },
            }}
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
          {uploadedImageUrl && (
            <div className="relative mt-4 inline-block">
              <Image
                src={uploadedImageUrl}
                width={200}
                height={120}
                alt="Uploaded Course"
                className="rounded-xl shadow-sm object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setUploadedImageUrl("");
                  setFormData((prev) => ({ ...prev, image: "" }));
                }}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Link
            href="/admin/course"
            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-[#090D24] hover:bg-black rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Adding..." : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCoursePage;
