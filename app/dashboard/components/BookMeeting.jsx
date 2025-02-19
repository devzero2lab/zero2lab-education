import React from "react";
import NoticeSection from "./NoticeSection";
import BookingForm from "./BookingForm";

function BookMeeting() {
  return (
    <main className="w-full p-4 border border-gray-200 bg-gray rounded-2xl md:p-8">
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl lg:grid-cols-2">
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
