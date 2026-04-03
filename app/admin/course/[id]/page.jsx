"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, ArrowLeft, Plus, BookOpen } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import Link from "next/link";

const inputClass =
  "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder-slate-400 transition";

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

function FormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-slate-200 rounded w-1/3 mb-2" />
              <div className="h-10 bg-slate-200 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpdateCoursePage({ params }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [course, setCourse] = useState(null);
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

  const courseId = params?.id || "";

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/course/${courseId}`);
        const courseData = response.data.course;
        setFormData({
          courseName: courseData.courseName,
          uniqueName: courseData.uniqueName,
          type: courseData.type,
          description: courseData.description,
          image: courseData.image,
          level: courseData.level,
          duration: courseData.duration,
          price: courseData.price || 0,
          discountPrice: courseData.discountPrice || 0,
          instructor: courseData.instructor,
          content: courseData.content || [],
        });
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details");
      }
    };
    if (courseId) fetchCourseDetails();
  }, [courseId, apiUrl]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axios.put(`${apiUrl}/api/courses/${courseId}`, formData);
      if (response.status === 200) {
        toast.success("Course updated successfully!");
        router.push("/admin/course");
      } else {
        toast.error("Failed to update course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course", error);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddContent = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { day: 0, videoUrl: "", notes: "" }],
    }));
  };

  const handleRemoveContent = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleContentChange = (index, e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseInt(value, 10) : value;
    setFormData((prev) => {
      const updatedContent = [...prev.content];
      updatedContent[index] = { ...updatedContent[index], [name]: parsedValue };
      return { ...prev, content: updatedContent };
    });
  };

  const handleImageUpload = (files) => {
    if (files?.[0]?.url) {
      if (formData.image) {
        toast.error("Remove existing image before uploading new one");
        return;
      }
      setFormData((prev) => ({ ...prev, image: files[0].url }));
      toast.success("Image uploaded successfully");
    }
  };

  const handleDeleteImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    toast.success("Image removed");
  };

  if (!course) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-6 bg-slate-200 rounded w-40 animate-pulse" />
        </div>
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
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
            <h1 className="text-xl font-bold text-slate-800">Update Course</h1>
            <p className="text-xs text-slate-500 truncate max-w-xs">{course.courseName}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdate}>
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-100">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Course Name *</label>
              <input type="text" name="courseName" value={formData.courseName}
                onChange={handleInputChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Unique Name (Slug) *</label>
              <input type="text" name="uniqueName" value={formData.uniqueName}
                onChange={handleInputChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className={inputClass}>
                <option value="Live">Live</option>
                <option value="Recorded">Recorded</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Level</label>
              <select name="level" value={formData.level} onChange={handleInputChange} className={inputClass}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea name="description" value={formData.description}
                onChange={handleInputChange} className={inputClass} rows="4" />
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
              <input type="number" name="price" min="0" value={formData.price}
                onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Discount Price (Rs.)</label>
              <input type="number" name="discountPrice" min="0" value={formData.discountPrice}
                onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <input type="text" name="duration" value={formData.duration}
                onChange={handleInputChange} className={inputClass} placeholder="e.g. 8 weeks" />
            </div>
            <div>
              <label className={labelClass}>Instructor</label>
              <input type="text" name="instructor" value={formData.instructor}
                onChange={handleInputChange} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-4">
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
            onClientUploadComplete={handleImageUpload}
            onUploadError={() => toast.error("Image upload failed")}
            disabled={!!formData.image}
          />
          {formData.image ? (
            <div className="relative mt-4 inline-block">
              <Image
                src={formData.image}
                alt="Course"
                width={200}
                height={120}
                className="rounded-xl shadow-sm object-cover"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">No image uploaded. Upload to update.</p>
          )}
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Course Content</h2>
            <button
              type="button"
              onClick={handleAddContent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Plus size={13} />
              Add Item
            </button>
          </div>

          <div className="space-y-3">
            {formData.content.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">
                No content items yet. Click &quot;Add Item&quot; to start.
              </p>
            )}
            {formData.content.map((item, index) => (
              <div key={index} className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="number"
                    name="day"
                    placeholder="Day #"
                    min="1"
                    value={item.day}
                    onChange={(e) => handleContentChange(index, e)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder="Video URL"
                    value={item.videoUrl}
                    onChange={(e) => handleContentChange(index, e)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    name="notes"
                    placeholder="Notes (optional)"
                    value={item.notes}
                    onChange={(e) => handleContentChange(index, e)}
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveContent(index)}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
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
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCoursePage;
