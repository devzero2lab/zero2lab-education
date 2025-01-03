import React from "react";
import Image from "next/image";
import Link from "next/link";
import MLLearningThings from "./MLLearningThings";
import MLCertificate from "./MLCertificate";

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
              Machine Learning Course
            </p>
            <p className="my-2 font-semibold text-1xl opacity-90 xl:text-lg">
              Professional Certification
            </p>
            <p className="font-semibold text-1xl xl:text-lg opacity-90">
              Learn the essentials of machine learning with Python.This course
              covers core concepts like supervised and unsupervised learning,
              decision trees, and regression models to kickstart your AI career.
            </p>
            <Link
              href={"/courses/recorded"}
              className="flex items-center justify-center bg-[#ff595c] text-white font-bold text-lg px-5 py-3 rounded-lg my-4 md:w-60"
            >
              Enrollment Over
            </Link>
          </div>
        </section>
        <div className="my-5"></div>
        {/* learning things */}
        <MLLearningThings />
        {/* certificate section */}
        <MLCertificate />
      </div>
      {/* Blue gradient on the left */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-1/3 h-[200px] bg-blue-200 rounded-full blur-[50px]"></div>
      {/* Green gradient on the right */}
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-1/3 h-[200px] bg-green-200 rounded-full blur-[50px]"></div>
    </div>
  );
}

export default page;
