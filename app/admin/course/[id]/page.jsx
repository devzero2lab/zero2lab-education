"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

function UpdateCoursePage({ params }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [course, setCourse] = useState(null);
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
        const response = await axios.get(
          `${apiUrl}/api/admin/course/${courseId}`
        );
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

    if (courseId) {
      fetchCourseDetails();
    }
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
      const response = await axios.put(
        `${apiUrl}/api/courses/${courseId}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Course updated successfully!");
        router.push("/admin/course");
      } else {
        toast.error("Failed to update course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course", error);
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
      updatedContent[index] = {
        ...updatedContent[index],
        [name]: parsedValue,
      };
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
    toast.success("Image removed successfully");
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Update Course</h1>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-2 gap-6">
          {/* Course Name */}
          <div>
            <label className="block mb-1 font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* Unique Name */}
          <div>
            <label className="block mb-1 font-medium">Unique Name</label>
            <input
              type="text"
              name="uniqueName"
              value={formData.uniqueName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* Type */}
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Live">Live</option>
              <option value="Recorded">Recorded</option>
            </select>
          </div>
          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          {/* Course Image */}
          <div>
            <label className="block mb-1 font-medium">Course Image</label>
            {/* Image upload button */}
            <UploadButton
              className={`w-full py-4 font-medium text-white transition-all duration-300 rounded-xl sm:w-auto`}
              appearance={{
                button: {
                  padding: "1rem 1rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  background: "linear-gradient(to right, #4F46E5, #3B82F6)",
                  color: "#FFFFFF",
                },
              }}
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUpload}
              onUploadError={() => toast.error("Image upload failed")}
              disabled={!!formData.image} // Disable if an image is already uploaded
            >
              {formData.image ? "Image Uploaded" : "Upload New Image"}
            </UploadButton>
            {formData.image ? (
              <div className="relative mt-2">
                <Image
                  src={formData.image}
                  alt="Course Image"
                  width={200}
                  height={200}
                  className="rounded"
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute top-0 right-0 p-2 text-red-500 bg-white rounded-full"
                >
                  <Trash2 />
                </button>
              </div>
            ) : (
              <p className="text-gray-500">
                No image uploaded. Upload a new image to update.
              </p>
            )}
          </div>
          {/* Level */}
          <div>
            <label className="block mb-1 font-medium">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          {/* Duration */}
          <div>
            <label className="block mb-1 font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Discount Price */}
          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              min="0"
              value={formData.discountPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Instructor */}
          <div>
            <label className="block mb-1 font-medium">Instructor</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Course Content</h2>
          {formData.content.map((contentItem, index) => (
            <div key={index} className="p-4 mt-4 border rounded">
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="day"
                  placeholder="Day"
                  min="1"
                  value={contentItem.day}
                  onChange={(e) => handleContentChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="Video URL"
                  value={contentItem.videoUrl}
                  onChange={(e) => handleContentChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="notes"
                  placeholder="Notes (optional)"
                  value={contentItem.notes}
                  onChange={(e) => handleContentChange(index, e)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveContent(index)}
                className="mt-2 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddContent}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Content
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-6 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateCoursePage;
