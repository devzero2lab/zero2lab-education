import HLSPlayer from "./HLSPlayer";
import React, { useEffect, useState } from "react";
import Modal from "../../../modal/Modal";
import ScheduleForm from "../../../schedule-meetings/schedule-form/page";
import {

  FaPlus,
  FaLock,
} from "react-icons/fa";


function parseTextWithLinks(text) {
  // Regular expression to detect URLs
  const urlRegex = /https?:\/\/[^\s]+/g;

  // Split text into parts with URLs and non-URLs
  const parts = text.split(urlRegex);

  // Match all URLs
  const urls = text.match(urlRegex);

  // Combine parts and URLs into React elements
  const elements = [];
  parts.forEach((part, index) => {
    elements.push(<span key={`text-${index}`}>{part}</span>);
    if (urls && urls[index]) {
      elements.push(
        <React.Fragment key={`link-${index}`}>
          <br /> {/* Add a line break before the link */}
          <a
            href={urls[index]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {urls[index]}
          </a>
          <br /> {/* Add a line break after the link */}
        </React.Fragment>
      );
    }
  });

  return elements;
}

export default function VideoSection({ currentLesson }) {


  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500">Select a lesson to view.</p>
      </div>
    );
  }


  const urlObj = new URL(currentLesson.videoUrl);

  return (
    <div className="flex-1 p-8 mt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {/* Video Section */}
      <div className="w-full aspect-video">
        <HLSPlayer videoUrl={urlObj.pathname} />
      </div>
      <div className=" flex justify-start">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <FaPlus className="mr-2" />
          Schedule Meeting
        </button>
      </div>

      {/* Schedule Meeting Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ScheduleForm onClose={() => setIsModalOpen(false)} />
      </Modal>
      {/* Lesson Details */}
      <h1 className="mt-4 text-lg font-bold md:text-2xl">Day {currentLesson.day}</h1>
      <p className="mt-2 text-sm text-gray-700 md:text-base">{parseTextWithLinks(currentLesson.notes)}</p>
      
    </div>
  );
}
