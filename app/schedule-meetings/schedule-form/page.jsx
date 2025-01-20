// components/ScheduleForm.js
"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ScheduleForm({ onClose }) {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    email: user?.emailAddresses?.[0]?.emailAddress || "",
    userId: user?.id || "",
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await res.json();
      console.log("Schedule created successfully:", data);
      alert("Schedule created successfully!");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create schedule. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Schedule a New Meeting</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-lg"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-lg"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Schedule Meeting
        </button>
      </form>
    </div>
  );
}