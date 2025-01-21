import React from "react";

function Hero() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="bg2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        {/* Heading */}
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Explore Your <span className="text-yellow-300">Learning Path</span>
        </h1>

        <p className="text-4xl lg:text-4xl text-gray-300 mb-8 max-w-2xl">
        Welcome to zero2lab LMS
        </p>

        {/* Subtitle */}
        <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl">
          Take your knowledge to the next level with guided learning and practice
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
            Join Now
          </button>
          <button className="bg-orange-700  text-white px-6 py-3 rounded-lg shadow-md hover:bg-opacity-30 transition flex items-center gap-2">
          Browse Courses
            <span className="text-white font-bold text-lg">→</span>
          </button>
        </div>

        {/* Trusted By Section */}
        <div className="flex items-center gap-4 mt-6">
          <p className="text-gray-300 text-sm">
            Trusted by <span className="font-bold text-white">1000+ students</span> <br />
            Rated <span className="font-bold text-yellow-400">4.5/5</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
