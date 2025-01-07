"use client";
import React, { useState } from "react";

function UpdateCoursePage() {
  const [formData, setFormData] = useState({
    courseName: "",
    uniqueName: "",
    type: "Live", // Default to "Live"
    description: "",
    image: "",
    level: "",
    duration: "",
    price: 0,
    instructor: "",
    content: [], // Initially empty
  });

  const [contentItem, setContentItem] = useState({
    day: "",
    videoUrl: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentInputChange = (e) => {
    const { name, value } = e.target;
    setContentItem({ ...contentItem, [name]: value });
  };

  const addContent = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { ...contentItem }],
    });
    setContentItem({ day: "", videoUrl: "", notes: "" }); // Clear content inputs
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Send formData to your backend or API here
  };

  return (
    <div className="p-6 bg-white rounded shadow-md ">
      <h1 className="mb-4 text-2xl font-bold">Update Course</h1>
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
              required
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
              required
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
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Level</label>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
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
          <h2 className="text-lg font-semibold">Course Content</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium">Day</label>
              <input
                type="number"
                name="day"
                value={contentItem.day}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Video URL</label>
              <input
                type="text"
                name="videoUrl"
                value={contentItem.videoUrl}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Notes</label>
              <input
                type="text"
                name="notes"
                value={contentItem.notes}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addContent}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Content
          </button>
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

export default UpdateCoursePage;
