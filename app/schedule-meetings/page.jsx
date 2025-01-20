"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaCalendarAlt, FaArrowLeft, FaArrowRight, FaCalendarDay, FaCalendarWeek, FaCalendar } from "react-icons/fa"; // Icons

// Setup the localizer for React Big Calendar
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyMeetingsCalendar() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Initialize state hooks
  const [formData, setFormData] = useState({
    email: "",
    userId: "",
  });

  const [schedules, setTopics] = useState([]); // State to store fetched schedules
  const [currentDate, setCurrentDate] = useState(new Date()); // State to manage the current date
  const [currentView, setCurrentView] = useState("month"); // State to manage the current view (month, week, day)

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

  // Format schedules for React Big Calendar
  const calendarEvents = schedules.map((schedule) => ({
    id: schedule._id, // Use the MongoDB _id as the event ID
    title: schedule.title,
    start: new Date(`${schedule.date.split("T")[0]}T${schedule.time}`), // Combine date and time
    end: new Date(`${schedule.date.split("T")[0]}T${schedule.time}`), // Same as start for single-day events
    description: schedule.description,
    meetingLink: schedule.meetingLink,
  }));

  // Custom Event Component
  const EventComponent = ({ event }) => (
    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
      <strong className="block text-sm text-blue-800">{event.title}</strong>
      <p className="text-xs text-gray-600">{event.description}</p>
      {event.meetingLink !== "Not Scheduled Yet" && (
        <a
          href={event.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-1 text-xs text-blue-600 hover:text-blue-800"
        >
          Join Meeting
        </a>
      )}
    </div>
  );

  // Handle navigation (Previous, Next, Today)
  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  // Handle view change (Month, Week, Day)
  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null; // Prevent rendering if not signed in
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <FaCalendarAlt className="mr-3 w-8 h-8 text-blue-500" />
            My Meetings
          </h1>
      
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-full max-w-4xl mx-auto">
          {/* Custom Toolbar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => handleNavigate(new Date())}
                className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
              >
                Today
              </button>
              <button
                onClick={() => handleNavigate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavigate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewChange("month")}
                className={`px-4 py-2 text-sm font-semibold ${
                  currentView === "month"
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-blue-50"
                } rounded-lg hover:bg-blue-100 transition-all`}
              >
                <FaCalendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleViewChange("week")}
                className={`px-4 py-2 text-sm font-semibold ${
                  currentView === "week"
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-blue-50"
                } rounded-lg hover:bg-blue-100 transition-all`}
              >
                <FaCalendarWeek className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleViewChange("day")}
                className={`px-4 py-2 text-sm font-semibold ${
                  currentView === "day"
                    ? "text-white bg-blue-600"
                    : "text-blue-600 bg-blue-50"
                } rounded-lg hover:bg-blue-100 transition-all`}
              >
                <FaCalendarDay className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar */}
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }} // Adjusted height for better visibility
            date={currentDate} // Controlled current date
            view={currentView} // Controlled current view
            onNavigate={handleNavigate} // Handle date navigation
            onView={handleViewChange} // Handle view change
            components={{
              event: EventComponent, // Custom event component
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#EFF6FF", // Light blue background for events
                borderColor: "#93C5FD", // Light blue border
                borderRadius: "8px", // Rounded corners
                color: "#1E40AF", // Dark blue text
              },
            })}
          />
        </div>
      </div>
    </div>
  );
}
