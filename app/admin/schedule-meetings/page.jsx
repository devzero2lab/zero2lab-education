"use client";

import React, { useState, useEffect } from 'react';

const TopicsPage = () => {
  const [schedules, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    email: '',
    meetingLink: '',
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalTopics: 0,
    totalPages: 0,
  });

  // Fetch all schedules with pagination
  const fetchAllTopics = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`/api/schedules/update?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (response.ok) {
        setTopics(data.schedules);
        setPagination(data.pagination);
      } else {
        console.error('Failed to fetch schedules:', data.error);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  // Fetch schedules when the component mounts or pagination changes
  useEffect(() => {
    fetchAllTopics(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  // Function to handle schedule selection for updating
  const handleSelectTopic = (schedule) => {
    setSelectedTopic(schedule);

    // Convert ISO date to YYYY-MM-DD format for the date input
    const formattedDate = schedule.date ? schedule.date.split('T')[0] : '';

    setFormData({
      title: schedule.title,
      description: schedule.description,
      date: formattedDate, // Use the formatted date
      time: schedule.time,
      email: schedule.email,
      meetingLink: schedule.meetingLink,
    });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission (update schedule)
  const handleUpdateTopic = async (e) => {
    e.preventDefault();
    if (!selectedTopic) return;

    try {
      const response = await fetch('/api/schedules', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedTopic._id,
          ...formData,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Schedule updated successfully!');
        fetchAllTopics(pagination.page, pagination.limit); // Refresh the list of schedules
        setSelectedTopic(null); // Clear the selected schedule
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          email: '',
          meetingLink: '',
        });
      } else {
        console.error('Failed to update schedule:', data.error);
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    setPagination((prev) => ({ ...prev, limit: parseInt(e.target.value), page: 1 }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Topics</h1>

      {/* Display all schedules */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Topics</h2>
        <ul className="space-y-4">
          {schedules.map((schedule) => (
            <li
              key={schedule._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <strong className="text-lg">{schedule.title}</strong>
                <p className="text-gray-600">{schedule.description}</p>
              </div>
              <button
                onClick={() => handleSelectTopic(schedule)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <div>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
        <div>
          <select
            value={pagination.limit}
            onChange={handleLimitChange}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
      </div>

      {/* Update Schedule Form */}
      {selectedTopic && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4">Update Schedule</h2>
          <form onSubmit={handleUpdateTopic} className="space-y-4">
            <div>
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Meeting Link:</label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Update Schedule
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;