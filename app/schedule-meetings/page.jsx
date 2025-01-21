"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { FaCalendarAlt, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format } from 'date-fns';

const localizer = momentLocalizer(require('moment')); // Localize the calendar

export default function MyMeetingsCalendar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    userId: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [view, setView] = useState("month"); // Default to Month view
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track selected date

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setFormData((prev) => ({
        ...prev,
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        userId: user?.id || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  // Fetch schedules based on user email
  useEffect(() => {
    const fetchSchedules = async () => {
      if (formData.email) {
        try {
          const res = await fetch(`/api/schedules?email=${formData.email}`);
          if (!res.ok) throw new Error("Failed to fetch schedules");
          const data = await res.json();
          setSchedules(data.schedules);
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      }
    };

    fetchSchedules();
  }, [formData.email]);

  // Convert the schedule date to a Date object for react-big-calendar
  const events = schedules.map(schedule => ({
    title: schedule.title,
    start: new Date(schedule.date),
    end: new Date(schedule.date),
    description: schedule.description,
    meetingLink: schedule.meetingLink,
  }));

  // Handle View Changes
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Get meetings for the selected date
  const getMeetingsForSelectedDate = () => {
    return schedules.filter(schedule => 
      format(new Date(schedule.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
  };

  // Handle navigation (Back and Next buttons)
  const handleNavigate = (date) => {
    setSelectedDate(date); // Update the selected date when navigating
  };

  // Handle clicking on a date inside the calendar
  const handleDateClick = (date) => {
    setSelectedDate(date); // Update the selected date when a date is clicked
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-teal-50 to-pink-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border-2 border-black shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <FaCalendarAlt className="mr-4 text-blue-500 text-3xl" />
            My Meetings
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Click on any date to view or join your scheduled meetings.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex justify-center mb-6 space-x-6">
          <button
            onClick={() => handleViewChange("month")}
            className="text-xl p-2 rounded-full text-blue-600 hover:bg-blue-50"
          >
            <FaCalendarAlt />
          </button>
          <button
            onClick={() => handleViewChange("week")}
            className="text-xl p-2 rounded-full text-blue-600 hover:bg-blue-50"
          >
            <FaCalendarWeek />
          </button>
          <button
            onClick={() => handleViewChange("day")}
            className="text-xl p-2 rounded-full text-blue-600 hover:bg-blue-50"
          >
            <FaCalendarDay />
          </button>
        </div>

        {/* React Big Calendar with Black Border */}
        <div className="overflow-hidden  rounded-lg">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']} // Specify available views
            view={view} // Control the current view
            onView={handleViewChange} // Update state on view change
            onNavigate={handleNavigate} // Handle calendar navigation (back and next)
            date={selectedDate} // Ensure the calendar is tied to selected date
            onSelectDate={handleDateClick} // Handle clicking on a date inside the calendar
          />
        </div>

        {/* Agenda Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Meetings on {format(selectedDate, 'yyyy-MM-dd')}
          </h2>
          <ul className="mt-4 space-y-4">
            {getMeetingsForSelectedDate().length > 0 ? (
              getMeetingsForSelectedDate().map((schedule, index) => (
                <li
                  key={index}
                  className="p-6 border rounded-lg shadow-lg bg-white hover:bg-blue-50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-blue-600">
                    {schedule.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{schedule.description}</p>
                  {schedule.meetingLink !== "Not Scheduled Yet" && (
                    <a
                      href={schedule.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 text-blue-500 hover:underline"
                    >
                      Join Meeting
                    </a>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No meetings scheduled for this date.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
