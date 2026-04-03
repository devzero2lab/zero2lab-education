import React from "react";
import NoticeSection from "./NoticeSection";
import BookingForm from "./BookingForm";

function BookMeeting() {
  return (
    <main className="w-full p-4 sm:p-5 lg:p-8 border-2 border-gray-100 bg-white rounded-3xl mt-10 shadow-sm">
      <div className="flex items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#090D24]">
          Book a Consultation Let&apos;s Connect
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-8">
          <NoticeSection />
        </div>
        <div>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}

export default BookMeeting;
