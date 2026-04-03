import React from "react";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";

export default function Sidebar({ lessons, currentDay, setCurrentDay }) {
  return (
    <div className="w-full shrink-0 h-[30vh] md:h-full overflow-y-auto bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 md:w-[17rem] xl:w-[20rem] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="p-4 sm:p-5">
        <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-3 px-1">Course Content</h3>
        <ul className="space-y-1">
          {lessons.map((lesson, index) => {
            const isActive = currentDay === lesson.day;
            return (
              <li
                key={index}
                onClick={() => setCurrentDay(lesson.day)}
                className={`p-3 flex items-center gap-3 transition-colors duration-200 rounded-lg cursor-pointer ${
                  isActive
                    ? "bg-[#090D24] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-200/60"
                }`}
              >
                <div className={`shrink-0 ${isActive ? "text-[#D9FFA5]" : "text-gray-400"}`}>
                  {isActive ? <FaPlayCircle size={16} /> : <FaCheckCircle size={16} />}
                </div>
                <span className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-gray-700"}`}>
                  Day {lesson.day}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
