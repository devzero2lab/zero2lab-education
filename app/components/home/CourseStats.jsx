import React from "react";

function CourseStats() {
  return (
    <div className="py-20">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Our Impact in <span className="text-[#0085fe]">Numbers</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Quantifying our success through measurable achievements and student
            outcomes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 text-center transition-all duration-300 transform bg-[#5c19e7] group rounded-xl"
            >
              <div className="relative inline-block mb-6">
                <div className="relative z-10 text-4xl font-bold text-white">
                  {stat.value}
                  {stat.plus && <span className="text-white">+</span>}
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">
                {stat.title}
              </h3>
              <p className="text-white">{stat.description}</p>
              <div className="mt-6">
                <div className="w-16 h-1.5 bg-white mx-auto rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Progress Bar */}
        <div className="max-w-3xl px-4 mx-auto mt-20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-medium text-gray-800">
              Overall Course Completion Rate
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#5c19e7] to-[#0085fe] bg-clip-text text-transparent">
              85%
            </span>
          </div>
          <div className="relative w-full h-3 overflow-hidden bg-gray-100 rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#5c19e7] to-[#0085fe] rounded-full transition-all duration-1000"
              style={{ width: "85%" }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="mt-3 text-sm text-right text-gray-500">
            Based on 100+ completed courses
          </p>
        </div>
      </div>
    </div>
  );
}

// Stats Data
const stats = [
  {
    value: 100,
    plus: true,
    title: "Enrollments",
    description: "Students joined our courses",
  },
  {
    value: 3,
    plus: true,
    title: "Courses Completed",
    description: "Successfully finished by students",
  },
  {
    value: 5,
    plus: true,
    title: "University Students",
    description: "Attending our programs",
  },
];

export default CourseStats;
