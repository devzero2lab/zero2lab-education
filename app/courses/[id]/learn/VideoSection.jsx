import React from "react";
import HLSPlayer from "./HLSPlayer";
import { FaPlayCircle } from "react-icons/fa";

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

export default function VideoSection({ currentLesson }) {
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

  const urlObj = new URL(currentLesson.videoUrl);

  return (
    <div className="flex-1 w-full overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {/* Video Player - Full width on all screens */}
      <div className="w-full bg-black aspect-video shadow-sm">
        <HLSPlayer videoUrl={urlObj.pathname} />
      </div>

      {/* Content Section below video */}
      <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8 border-b border-gray-100 pb-4 sm:pb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-[#090D24]">
            Day {currentLesson.day} Lesson
          </h1>
        </div>
        
        {/* Lesson Details - Wrap to prevent breaking mobile screens */}
        <div className="w-full break-words overflow-hidden">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Lesson Notes
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal whitespace-pre-wrap w-full overflow-x-hidden">
            {currentLesson.notes ? parseTextWithLinks(currentLesson.notes) : <span className="text-gray-400 italic">No notes available.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
