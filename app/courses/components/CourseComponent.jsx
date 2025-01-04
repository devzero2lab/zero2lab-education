import Link from "next/link";
import React from "react";
import { BookOpen, Clock, TvMinimal } from "lucide-react";
import Image from "next/image";

function CourseComponent({ course }) {
  return (
    <Link
      href={`/courses/${course.uniqueName}`}
      className="p-4 transition-shadow duration-300 bg-white border rounded-lg shadow-lg hover:shadow-2xl flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
    >
      <Image
        width={200}
        height={200}
        src="/images/homepage/course1.png"
        alt="Course Image"
        className="object-contain w-full mb-4 bg-gray-100 rounded-md h-60"
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{course.courseName}</h2>
        <BookOpen size={20} />
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="font-medium bg-[#1dd506] text-white px-3 py-1 rounded-full">
          {course.level}
        </span>
        <div className="flex items-center gap-1">
          <span className="font-medium">Price: Rs.{course.price}</span>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>Duration: {course.duration}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <TvMinimal size={16} />
          <span>Course Type : {course.type}</span>
        </div>
      </div>
    </Link>
  );
}

export default CourseComponent;
