import React from "react";
import Image from "next/image";
import Link from "next/link";
import FDLearningThings from "./FDLearningThings";

function page() {
  return (
    <div className="mx-12 mt-20 lg:mx-32">
      <div className="relative z-30 h-full">
        {/* hero section */}
        <section className="grid grid-cols-1 mt-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative w-full h-full">
            <Image
              src={"/images/courses/ml/cimage.jpeg"}
              alt="course-image"
              width={500}
              height={400}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col mt-5 max-w-full lg:max-w-[700px]">
            <p className="text-2xl font-bold md:text-4xl xl:text-5xl">
              Full Stack Web Development
            </p>
            <p className="my-2 font-semibold text-1xl opacity-90 xl:text-lg">
              Professional Certification
            </p>
            <p className="font-semibold text-1xl xl:text-lg opacity-90">
              Become a full stack web developer by mastering frontend design,
              backend logic, and database management.This course equips you with
              the skills to build and deploy complete, dynamic web applications.
            </p>
            <Link
              href={"/courses/6778dd887972680042a1f093/enroll"}
              className="flex items-center justify-center bg-[#5e53ff] text-white font-bold text-lg px-5 py-3 rounded-lg my-4 md:w-40"
            >
              Enroll Now
            </Link>
          </div>
        </section>
        <div className="my-5">
          {/* learning things */}
          <FDLearningThings />
        </div>
      </div>
      {/* Blue gradient on the left */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-1/3 h-[200px] bg-blue-200 rounded-full blur-[50px]"></div>
      {/* Green gradient on the right */}
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-1/3 h-[200px] bg-green-200 rounded-full blur-[50px]"></div>
    </div>
  );
}

export default page;
