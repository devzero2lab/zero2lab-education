import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function BookingForm() {
  const { user } = useUser();
  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">Book a Meeting</h1>
        <p className="mt-2 text-gray-600">
          Schedule your 30 minute consultation
        </p>
      </div>
      <form className="p-6 space-y-6">
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
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Date and Time
          </label>
          <div className="relative">
            <DatePicker
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholderText="Click to select date and time"
              timeIntervals={30}
            />
            <Calendar
              className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
              size={20}
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          disabled
        >
          <Clock size={20} />
          Book 30 Minute Meeting
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
