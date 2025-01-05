import Image from "next/image";
import Link from "next/link";
import React from "react";

function Features() {
  return (
    <div className="relative z-30 flex flex-col items-center w-full pb-10 bg-gradient-to-b from-white to-gray-100 ">
      <h2 className="mb-8 text-4xl font-bold text-gray-800">Our Features</h2>
      <div className="grid max-w-6xl grid-cols-1 gap-10 px-5 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={"/courses"}
          className="flex flex-col items-center bg-white rounded-lg h-[355px] shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <Image
            height={300}
            width={300}
            className="rounded-t-lg"
            src="/images/homepage/course1.png"
            alt="Feature 1"
          />
          <button className="mt-4 bg-gradient-to-r from-[#2678f2] to-[#636df6] text-white px-6 py-1 rounded-full font-medium hover:shadow-lg">
            Browse Courses
          </button>
        </Link>

        <Link
          href={"/courses"}
          className="flex flex-col items-center bg-white rounded-lg h-[355px] shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex flex-col items-center bg-white rounded-lg h-[355px] shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Image
              height={300}
              width={300}
              className="rounded-t-lg"
              src="/images/homepage/spring.png"
              alt="Feature 1"
            />
            <button className="mt-4 bg-gradient-to-r from-[#2678f2] to-[#636df6] text-white px-6 py-1 rounded-full font-medium hover:shadow-lg">
              Browse Courses
            </button>
          </div>
        </Link>

        <Link
          href={"/courses"}
          className="flex flex-col items-center bg-white rounded-lg h-[355px] shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg h-[355px] transform hover:scale-105 transition-transform duration-300">
            <Image
              height={300}
              width={300}
              className="rounded-t-lg"
              src="/images/homepage/fwd.jpeg"
              alt="Feature 1"
            />
            <button className="mt-4 bg-gradient-to-r from-[#2678f2] to-[#636df6] text-white px-6 py-1 rounded-full font-medium hover:shadow-lg">
              {" "}
              Browse Courses
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Features;
