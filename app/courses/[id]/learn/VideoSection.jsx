import HLSPlayer from "./HLSPlayer";

export default function VideoSection({ currentLesson }) {
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

      {/* Lesson Details */}
      <h1 className="mt-4 text-lg font-bold md:text-2xl">Day {currentLesson.day}</h1>
      <p className="mt-2 text-sm text-gray-700 md:text-base">{currentLesson.notes}</p>
    </div>
  );
}
