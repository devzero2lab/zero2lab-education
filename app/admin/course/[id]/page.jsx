"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function UpdateCoursePage({ params }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [course, setCourse] = useState(null); // Fetch course details
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

  const addContent = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { ...contentItem }],
    });
    setContentItem({ day: "", videoUrl: "", notes: "" }); // Clear content inputs
  };

  const courseId = params?.id || "";

  // Fetch course details based on course ID
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/courses/${courseId}`);
        const courseData = response.data.course;
        console.log(courseData);

        // Set course details to formData state
        setFormData({
          courseName: courseData.courseName,
          uniqueName: courseData.uniqueName,
          type: courseData.type,
          description: courseData.description,
          image: courseData.image,
          level: courseData.level,
          duration: courseData.duration,
          price: courseData.price,
          instructor: courseData.instructor,
          content: courseData.content, // Prepopulate content
        });

        // Set the course state to signal that the data has been loaded
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, apiUrl]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.put(
        `${apiUrl}/api/courses/${courseId}`,
        formData
      );

      if (response.status === 200) {
        alert("Course updated successfully!");
        router.push("/admin/course");
        console.log("Updated Course:", response.data);
      } else {
        alert("Failed to update course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("An error occurred while updating the course.");
    }
  };

  if (!course) {
    return <p>Loading...</p>; // Show loading state while fetching course data
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Update Course</h1>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-2 gap-6">
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
            <label className="block mb-1 font-medium">Course Image</label>
            {/* If there's an image URL, display the image; otherwise, show a fallback message */}
            {formData.image ? (
              <img
                src={formData.image}
                alt="Course Image"
                className="w-full h-auto mb-4 rounded"
              />
            ) : (
              <p className="text-gray-500">No image available</p>
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
          <div className="grid grid-cols-3 gap-6 mt-4">
            {/* Loop through content to render each field in columns */}
            {formData.content.map((contentItem, index) => (
              <React.Fragment key={index}>
                <div>
                  <label className="block mb-1 font-medium">Day</label>
                  <input
                    type="number"
                    name="day"
                    value={contentItem.day}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: formData.content.map((item, idx) =>
                          idx === index
                            ? { ...item, day: e.target.value }
                            : item
                        ),
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Video URL</label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={contentItem.videoUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: formData.content.map((item, idx) =>
                          idx === index
                            ? { ...item, videoUrl: e.target.value }
                            : item
                        ),
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Notes</label>
                  <textarea
                    name="notes"
                    value={contentItem.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: formData.content.map((item, idx) =>
                          idx === index
                            ? { ...item, notes: e.target.value }
                            : item
                        ),
                      })
                    }
                    className="w-full p-2 border rounded resize-none"
                    rows="3" // Adjust the number of rows as needed
                  />
                </div>
              </React.Fragment>
            ))}
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
