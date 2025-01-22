"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { FaCalendarAlt, FaCalendarDay, FaCalendarWeek } from "react-icons/fa";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns";

const localizer = momentLocalizer(require("moment"));

export default function MyMeetingsCalendar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    userId: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setFormData((prev) => ({
        ...prev,
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        userId: user?.id || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

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

  const events = schedules.map((schedule) => ({
    title: schedule.title,
    start: new Date(schedule.date),
    end: new Date(schedule.date),
    description: schedule.description,
    meetingLink: schedule.meetingLink,
  }));

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const getMeetingsForSelectedDate = () => {
    return schedules.filter(
      (schedule) =>
        format(new Date(schedule.date), "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
    );
  };

  const handleNavigate = (date) => {
    setSelectedDate(date);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="min-h-screen p-4 ">
      <div className="max-w-full mx-auto bg-white p-4 rounded-xl border-2 border-black shadow-xl md:max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center">
            <FaCalendarAlt className="mr-3 text-blue-500 text-2xl md:text-3xl" />
            My Meetings
          </h1>
          <p className="text-gray-600 mt-2 text-base md:text-lg">
            Click on any date to view or join your scheduled meetings.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex justify-center mb-6 space-x-3 md:space-x-6">
          <button
            onClick={() => handleViewChange("month")}
            className="text-xl p-3 rounded-full text-blue-600 hover:bg-blue-50 md:text-2xl"
          >
            <FaCalendarAlt />
          </button>
          <button
            onClick={() => handleViewChange("week")}
            className="text-xl p-3 rounded-full text-blue-600 hover:bg-blue-50 md:text-2xl"
          >
            <FaCalendarWeek />
          </button>
          <button
            onClick={() => handleViewChange("day")}
            className="text-xl p-3 rounded-full text-blue-600 hover:bg-blue-50 md:text-2xl"
          >
            <FaCalendarDay />
          </button>
        </div>

        {/* React Big Calendar */}
        <div className="overflow-x-auto">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 450, fontSize: "16px" }}
            views={["month", "week", "day"]}
            view={view}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            date={selectedDate}
            onSelectDate={handleDateClick}
          />
        </div>

        {/* Agenda Section */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Meetings on {format(selectedDate, "yyyy-MM-dd")}
          </h2>
          <ul className="mt-4 space-y-4">
            {getMeetingsForSelectedDate().length > 0 ? (
              getMeetingsForSelectedDate().map((schedule, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-blue-600">
                    {schedule.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {schedule.description}
                  </p>
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
