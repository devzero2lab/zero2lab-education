"use client";
import React, { useState } from "react";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

function AddCoursePage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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

  // Handle upload completion
  const handleUploadComplete = (res) => {
    if (res && res.length > 0) {
      const uploadedFileUrl = res[0]?.url;
      setUploadedImageUrl(uploadedFileUrl); // Update the image state with the uploaded URL
      setFormData({ ...formData, image: uploadedFileUrl }); // Update the form data
    } else {
      toast.error("No file was uploaded.");
    }
  };

  // Handle upload errors
  const handleUploadError = (error) => {
    console.error("Upload failed", error);
    toast.error("Failed to upload the image.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field in formData is empty
    const missingFields = Object.entries(formData).filter(
      ([key, value]) => key !== "image" && value === ""
    );

    if (missingFields.length > 0) {
      toast.error("All fields are required.");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload an image for the course.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/courses/`, formData);

      toast.success("Course added successfully!");
      router.push("/admin/course");
      // Optionally, reset the form or show a success message
      setFormData({
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
      });
      setUploadedImageUrl(""); // Reset the uploaded image preview
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add the course.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md ">
      <h1 className="mb-4 text-2xl font-bold">Add Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Unique Name</label>
            <input
              type="text"
              name="uniqueName"
              value={formData.uniqueName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
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
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <UploadButton
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
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
            />
            {uploadedImageUrl && (
              <Image
                src={uploadedImageUrl}
                width={200}
                height={200}
                alt="Uploaded Course"
                className="mt-4 rounded shadow-md "
              />
            )}
          </div>
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
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
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
        <button
          type="submit"
          className="px-4 py-2 mt-6 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCoursePage;
