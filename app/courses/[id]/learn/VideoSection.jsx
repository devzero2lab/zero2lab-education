"use client";
import React, { useState } from "react";
import SecureVideoPlayerWrapper from "@/app/components/SecureVideoPlayerWrapper";
import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";

function parseTextWithLinks(text) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const parts = text.split(urlRegex);
  const urls = text.match(urlRegex);

  const elements = [];
  parts.forEach((part, index) => {
    elements.push(<span key={`text-${index}`}>{part}</span>);
    if (urls && urls[index]) {
      elements.push(
        <React.Fragment key={`link-${index}`}>
          <br />
          <a
            href={urls[index]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium underline underline-offset-2 hover:text-[#090D24] transition-colors break-words lg:break-all whitespace-pre-wrap"
          >
            {urls[index]}
          </a>
          <br />
        </React.Fragment>
      );
    }
  });

  return elements;
}

export default function VideoSection({
  currentLesson,
  courseId,
  userId,
  completedLessons = [],
  onLessonComplete,
  cookiesReady,
}) {
  const [isMarking, setIsMarking] = useState(false);

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white min-h-[50vh]">
        <div className="text-center max-w-sm">
          <FaPlayCircle className="w-12 h-12 text-gray-200 mb-3 mx-auto" />
          <p className="text-lg font-semibold text-gray-900">No lesson selected</p>
          <p className="mt-1 text-sm text-gray-500">Select a lesson from the sidebar to continue learning.</p>
        </div>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(currentLesson.day);
  const proxiedVideoUrl = `/api/proxy?videoUrl=${encodeURIComponent(currentLesson.videoUrl)}`;

  const handleMarkComplete = async () => {
    if (isCompleted || isMarking) return;
    setIsMarking(true);
    try {
      await onLessonComplete(currentLesson.day);
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {/* Video Player */}
      <div className="w-full bg-black aspect-video shadow-sm">
        <SecureVideoPlayerWrapper
          videoUrl={proxiedVideoUrl}
          courseId={courseId}
          cookiesReady={cookiesReady}
        />
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {/* Title + Mark Complete */}
        <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#090D24]">
            Day {currentLesson.day} Lesson
          </h1>

          {/* Mark as Watched Button */}
          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D9FFA5] text-[#090D24] border-2 border-[#090D24] rounded-xl text-sm font-bold select-none">
              <FaCheckCircle className="w-4 h-4 text-[#090D24]" />
              Lesson Completed
            </div>
          ) : (
            <button
              onClick={handleMarkComplete}
              disabled={isMarking}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                isMarking
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-wait"
                  : "bg-[#090D24] text-white border-[#090D24] hover:bg-[#D9FFA5] hover:text-[#090D24] hover:shadow-[3px_3px_0_0_#090D24] active:translate-x-[1px] active:translate-y-[1px]"
              }`}
            >
              {isMarking ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaCheckCircle className="w-3.5 h-3.5" />
                  Mark as Watched
                </>
              )}
            </button>
          )}
        </div>

        {/* Lesson Notes */}
        <div className="w-full break-words overflow-hidden">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Lesson Notes
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal whitespace-pre-wrap w-full overflow-x-hidden">
            {currentLesson.notes
              ? parseTextWithLinks(currentLesson.notes)
              : <span className="text-gray-400 italic">No notes available.</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
