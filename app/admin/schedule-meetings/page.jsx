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
    isCompleted: false,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalTopics: 0,
    totalPages: 0,
  });

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

  useEffect(() => {
    fetchAllTopics(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const handleSelectTopic = (schedule) => {
    setSelectedTopic(schedule);
    const formattedDate = schedule.date ? schedule.date.split('T')[0] : '';
    setFormData({
      title: schedule.title,
      description: schedule.description,
      date: formattedDate,
      time: schedule.time,
      email: schedule.email,
      meetingLink: schedule.meetingLink,
      isCompleted: schedule.isCompleted || false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

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
        fetchAllTopics(pagination.page, pagination.limit);
        setSelectedTopic(null);
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          email: '',
          meetingLink: '',
          isCompleted: false,
        });
      } else {
        console.error('Failed to update schedule:', data.error);
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (e) => {
    setPagination((prev) => ({ ...prev, limit: parseInt(e.target.value), page: 1 }));
  };

  // Filter schedules into completed and incomplete
  const completedTopics = schedules.filter((schedule) => schedule.isCompleted);
  const incompleteTopics = schedules.filter((schedule) => !schedule.isCompleted);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Schedules</h1>

      {/* Vertical Layout for Incomplete and Completed Schedules */}
      <div className="flex gap-8">
        {/* Incomplete Schedules Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Incomplete Schedules</h2>
          <ul className="space-y-4">
            {incompleteTopics.map((schedule) => (
              <li
                key={schedule._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <strong className="text-lg">{schedule.title}</strong>
                  <p className="text-gray-600">{schedule.description}</p>
                  <p className="text-gray-600">Is Completed: No</p>
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

        {/* Completed Schedules Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Completed Schedules</h2>
          <ul className="space-y-4">
            {completedTopics.map((schedule) => (
              <li
                key={schedule._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <strong className="text-lg">{schedule.title}</strong>
                  <p className="text-gray-600">{schedule.description}</p>
                  <p className="text-gray-600">Is Completed: Yes</p>
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
            <div>
              <label className="block text-gray-700">Is Completed:</label>
              <input
                type="checkbox"
                name="isCompleted"
                checked={formData.isCompleted}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
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