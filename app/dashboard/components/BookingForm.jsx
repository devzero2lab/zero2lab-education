import React, { useState } from "react";
import { Calendar, Clock, Edit2 } from "lucide-react";
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
    <div className="w-full bg-white border-2 border-gray-100 rounded-3xl overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="p-5 sm:p-6 border-b-2 border-gray-100 bg-gray-50/50 flex flex-col items-start">
        <h1 className="text-lg sm:text-xl font-bold text-[#090D24] flex items-center gap-3">
          <span className="p-1.5 sm:p-2 bg-gray-100 border-2 border-gray-200 rounded-xl shrink-0">
            <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#090D24]" strokeWidth={2.5} />
          </span>
          Schedule Consultation
        </h1>
        <p className="mt-2.5 text-gray-500 font-medium text-xs sm:text-sm">
          Request your 30-minute private consultation.
        </p>
      </div>
      <form className="p-5 sm:p-6 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-bold text-[#090D24]">
            Email Address
          </label>
          <input
            type="email"
            value={user?.emailAddresses[0]?.emailAddress || ""}
            disabled
            className="w-full px-3 py-2.5 sm:py-3 text-xs sm:text-sm border-2 border-gray-100 rounded-xl bg-gray-50 text-gray-500 font-medium outline-none truncate cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-bold text-[#090D24] mb-1">
            Meeting Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            className="w-full h-28 px-3 py-2.5 sm:py-3 text-xs sm:text-sm border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-[#090D24]/10 focus:border-[#090D24] transition-all resize-y"
            required
            placeholder="Please describe the purpose of the meeting..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-bold text-[#090D24] flex items-center gap-2">
               Select Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full px-3 py-2.5 sm:py-3 text-xs sm:text-sm border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-[#090D24]/10 focus:border-[#090D24] transition-all cursor-pointer font-medium"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-bold text-[#090D24] flex items-center gap-2">
               Select Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              className="w-full px-3 py-2.5 sm:py-3 text-xs sm:text-sm border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-[#090D24]/10 focus:border-[#090D24] transition-all cursor-pointer font-medium"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="pt-3">
          <button
            type="submit"
            className="flex items-center justify-center w-full gap-2 px-5 py-3 sm:py-3.5 text-white font-bold bg-[#090D24] rounded-xl hover:bg-gray-800 transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? (
              <>
                 <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                 </svg>
                 Booking...
              </>
            ) : (
              <>
                <Clock size={18} strokeWidth={2.5}/>
                Book 30 Minute Meeting
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
