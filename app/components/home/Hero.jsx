import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="items-center  justify-center h-[60vh] relative   ">
      {/* details div */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full gap-10 px-4 md:flex-row md:px-8">
        <div className="flex flex-col justify-center h-full gap-5 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-bold md:text-5xl">
              Explore Your Learning Path
            </h1>
            <p className="mt-3 text-lg md:text-xl">
              Take your knowledge to the next level with guided learning and
              practice
            </p>
          </div>
          <Image
            height={200}
            width={200}
            src={"/images/homepage/sinhala.png"}
            alt="hero image"
            className="mx-auto md:mx-0"
          />
          <Link
            href={"/courses/recorded"}
            className="bg-gradient-to-r py-1 w-[180px] md:w-[220px] text-lg md:text-xl px-5 rounded-full text-white font-bold from-[#F24B26] to-[#F67E63] mt-5 mx-auto md:mx-0"
          >
            Browse Courses
          </Link>
        </div>
        <div className="hidden md:block">
          <Image
            height={300}
            width={300}
            src={"/images/homepage/hero.png"}
            alt="hero image"
          />
        </div>
      </div>

      {/* Blue gradient on the left */}
      <div className="absolute -top-32 left-0 w-1/3 h-full bg-blue-200 rounded-full blur-[150px]"></div>
      {/* Green gradient on the right */}
      <div className="absolute -bottom-32 right-0 w-1/3 h-full bg-green-200 rounded-full blur-[150px]"></div>
    </div>
  );
}

export default Hero;
