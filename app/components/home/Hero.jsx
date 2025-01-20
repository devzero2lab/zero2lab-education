import Image from "next/image";
import Link from "next/link";

import React from "react";

function Hero() {
  return (
    <div className="flex items-center  py-5 px-14 justify-center h-[75vh] relative">
      <div className="w-full  relative  bg-white rounded-[30px] bg-[url('/images/homepage/hero.png')] bg-cover shadow-md bg-center h-full">
        <div className="flex p-10 flex-col justify-around items-start bg-gradient-to-r from-white via-white rounded-[30px]  w-4/6 h-full " >
          <h1 className="text-5xl font-bold text-gray-900">
            Explore Your <br /> <span className="text-red-500">Learning </span> Path
          </h1>
          <div>
            <p className="text-gray-600 mt-4">
              Take your knowledge to the next level with guided learning and practice.
            </p>
            <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600">
              Browse Courses
            </button>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            www.zero2learn.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;