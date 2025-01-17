"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Checkout({ params }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  // Initialize state hooks
  const [formData, setFormData] = useState({
    email: "",
    whatsappNumber: "",
    userId: "",
    courseId: params?.id || "",
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [schedules, setTopics] = useState([]); // State to store fetched schedules

  // Fetch user details once loaded
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        userId: user?.id || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  // Fetch schedules by email when the email is available
  useEffect(() => {
    const fetchTopicsByEmail = async () => {
      if (formData.email) {
        try {
          const res = await fetch(`/api/schedules?email=${formData.email}`);
          if (!res.ok) {
            throw new Error("Failed to fetch schedules");
          }
          const data = await res.json();
          console.log("Fetched schedules:", data.schedules); // Debugging
          setTopics(data.schedules); // Update the schedules state
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      }
    };

    fetchTopicsByEmail();
  }, [formData.email]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
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

      // Fetch updated schedules after submission
      const updatedRes = await fetch(`/api/schedules?email=${formData.email}`);
      if (!updatedRes.ok) {
        throw new Error("Failed to fetch updated schedules");
      }
      const updatedData = await updatedRes.json();
      setTopics(updatedData.schedules); // Update the schedules state

      // Reset form fields after submission
      setFormData({
        ...formData,
        title: "",
        description: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create schedule. Please try again.");
    }
  };

  // Format schedules for FullCalendar
  const calendarEvents = schedules.map((schedule) => ({
    id: schedule._id, // Use the MongoDB _id as the event ID
    title: schedule.title,
    start: new Date(`${schedule.date.split("T")[0]}T${schedule.time}`), // Combine date and time
    end: new Date(`${schedule.date.split("T")[0]}T${schedule.time}`), // Same as start for single-day events
    extendedProps: {
      description: schedule.description,
      meetingLink: schedule.meetingLink,
    },
  }));

  // Custom event content
  const renderEventContent = (eventInfo) => (
    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
      <strong className="block text-sm text-blue-800">{eventInfo.event.title}</strong>
      <p className="text-xs text-gray-600">{eventInfo.event.extendedProps.description}</p>
      {eventInfo.event.extendedProps.meetingLink !== "Not Scheduled Yet" && (
        <a
          href={eventInfo.event.extendedProps.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-1 text-xs text-blue-600 hover:text-blue-800"
        >
          Join Meeting
        </a>
      )}
    </div>
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
<div className="min-h-screen bg-gray-50 p-8 gap-6 px-4 py-10 bg-gray-50 mt-6">      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
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

        {/* Calendar Section */}
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Meetings</h2>
          <div className="h-[500px]">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              eventContent={renderEventContent}
              headerToolbar={{
                left: "",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}




              footerToolbar={{
                left: "prev,next today",
               
              }}


            />
          </div>
        </div>
      </div>
    </div>
  );
}