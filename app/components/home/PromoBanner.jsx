import React from "react";

function PromoBanner() {
  return (
    <div className="px-6 py-12 ">
      <div className="mx-auto text-center max-w-7xl">
        <h1 className="mb-4 text-4xl font-bold">
          Still Struggling with Coding?{" "}
          <span className="text-[#0085fe]">You&apos;re Not Alone!</span>
        </h1>
        <p className="p-2 mb-4 text-2xl bg-yellow-300 rounded-lg">
          Every developer has been where you are. Let&apos;s turn those
          challenges into stepping stones for your success
        </p>
        <p className="mb-8 text-xl">
          Join us and go from newbie to pro in months.why you join with us ?
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="py-16 text-white rounded-lg  bg-[#5c19e7]">
            <h2 className="mb-2 text-3xl font-bold">Build Apps from Scratch</h2>
            <p className="font-semibold text-md">
              We guide beginners step by step to develop complete applications
            </p>
          </div>
          <div className="py-16 text-white rounded-lg bg-[#5c19e7]">
            <h2 className="mb-2 text-3xl font-bold">Help Sessions</h2>
            <p className="font-semibold text-md">
              If you have any issues, you can schedule a meeting with us for
              support
            </p>
          </div>
          <div className="py-16 text-white rounded-lg bg-[#5c19e7]">
            <h2 className="mb-2 text-3xl font-bold"> Clear Explanations</h2>
            <p className="font-semibold text-md">
              We explain all concepts in an easy to understand and friendly way
            </p>
          </div>
          <div className="py-16 text-white rounded-lg  bg-[#5c19e7]">
            <h2 className="mb-2 text-3xl font-bold">Access Recordings</h2>
            <p className="font-semibold text-md">
              If you miss a live session, you can always watch the recordings
              later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;
