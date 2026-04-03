import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function CourseStats() {
  return (
    <div className={`py-16 md:py-24 ${montserrat.className}`}>
      <div className="container px-6 md:px-12 mx-auto max-w-[1300px]">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-[#090D24]">
            Our Impact in Numbers
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg font-medium text-[#090D24]">
            Quantifying our success through measurable achievements and student
            outcomes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 md:p-12 text-center transition-all duration-300 bg-[#D9FFA5] border-2 border-[#090D24] rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-md flex flex-col items-center justify-center"
            >
              <div className="relative inline-block mb-4 md:mb-6">
                <div className="relative z-10 text-5xl md:text-6xl font-extrabold text-[#090D24]">
                  {stat.value}
                  {stat.plus && <span className="text-[#090D24]">+</span>}
                </div>
              </div>
              <h3 className="mb-2 text-xl md:text-2xl font-bold text-[#090D24]">
                {stat.title}
              </h3>
              <p className="text-[#090D24] font-medium text-sm md:text-base opacity-80">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Animated Progress Bar */}
        <div className="max-w-3xl px-4 mx-auto mt-16 md:mt-24 border-2 border-[#090D24] rounded-[2rem] p-6 md:p-8 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base md:text-xl font-bold text-[#090D24]">
              Overall Course Completion Rate
            </span>
            <span className="text-xl md:text-2xl font-extrabold text-[#090D24]">
              85%
            </span>
          </div>
          <div className="relative w-full h-4 md:h-5 overflow-hidden bg-gray-100 rounded-full border border-gray-200">
            <div
              className="absolute inset-y-0 left-0 bg-[#090D24] rounded-full transition-all duration-1000"
              style={{ width: "85%" }}
            >
            </div>
          </div>
          <p className="mt-4 text-sm font-bold text-center md:text-right text-[#090D24] opacity-80">
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
