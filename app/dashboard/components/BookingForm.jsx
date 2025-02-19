import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

function BookingForm() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user } = useUser();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/meetings/`, {
        email: user?.emailAddresses[0]?.emailAddress,
        description,
        date,
        time,
      });
      toast.success("Meeting booked successfully!");
      setDescription("");
      setDate("");
      setTime("");
    } catch (error) {
      toast.error("Error booking meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">Book a Meeting</h1>
        <p className="mt-2 text-gray-600">
          Schedule your 30 minute consultation
        </p>
      </div>
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={user?.emailAddresses[0]?.emailAddress || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Meeting Description
          </label>
          <textarea
            id="description"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Please describe the purpose of the meeting..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Time
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          <Clock size={20} />
          {loading ? "Booking..." : "Book 30 Minute Meeting"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
