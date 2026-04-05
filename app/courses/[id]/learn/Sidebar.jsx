import React from "react";
import { FaPlayCircle, FaCheckCircle, FaCircle } from "react-icons/fa";

export default function Sidebar({ lessons, currentDay, setCurrentDay, completedLessons = [] }) {
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  return (
    <div className="w-full shrink-0 h-[35vh] md:h-full overflow-y-auto bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 md:w-[17rem] xl:w-[20rem] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="p-4 sm:p-5">
        {/* Course title + progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-bold tracking-wider text-gray-500 uppercase">Course Content</h3>
            <span className="text-xs font-bold text-[#090D24]">{progressPercent}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#090D24] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">
            {completedCount}/{totalLessons} lessons completed
          </p>
        </div>

        {/* Lesson list */}
        <ul className="space-y-1">
          {lessons.map((lesson, index) => {
            const isActive = currentDay === lesson.day;
            const isDone = completedLessons.includes(lesson.day);

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
                {/* Status icon */}
                <div className={`shrink-0 ${
                  isActive ? "text-[#D9FFA5]" : isDone ? "text-green-500" : "text-gray-300"
                }`}>
                  {isActive ? (
                    <FaPlayCircle size={16} />
                  ) : isDone ? (
                    <FaCheckCircle size={16} />
                  ) : (
                    <FaCircle size={10} />
                  )}
                </div>

                {/* Day label */}
                <span className={`text-sm font-medium truncate ${isActive ? "text-white" : isDone ? "text-gray-800" : "text-gray-500"}`}>
                  Day {lesson.day}
                </span>

                {/* Completed badge */}
                {isDone && !isActive && (
                  <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    Done
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
