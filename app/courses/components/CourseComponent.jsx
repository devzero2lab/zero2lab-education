import Link from "next/link";
import React from "react";
import { BookOpen, Clock, TvMinimal, AlertCircle } from "lucide-react";
import Image from "next/image";

function CourseComponent({ course }) {
  const calculateDiscountPercentage = () => {
    if (!course.discountPrice) return 0;
    return Math.round(
      ((course.price - course.discountPrice) / course.price) * 100
    );
  };

  return (
    <Link
      href={`/courses/${course.uniqueName}`}
      className="group p-4 transition-all duration-300 bg-white border rounded-lg shadow-lg hover:shadow-2xl flex flex-col w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] relative"
    >
      {/* Discount Ribbon */}
      {course.discountPrice > 0 && (
        <div className="absolute top-0 right-0 z-10 px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-tr-lg rounded-bl-lg">
          {calculateDiscountPercentage()}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-56 mb-2 overflow-hidden rounded-md">
        <Image
          fill
          src={course.image}
          alt="Course Image"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Rest of the content remains same */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">{course.courseName}</h2>
        <BookOpen size={20} className="text-gray-600" />
      </div>

      <div className="flex items-center justify-between mt-2 text-sm">
        <span className="font-medium bg-[#2936c1] text-white px-3 py-1 rounded-full">
          {course.level}
        </span>
        <div className="flex flex-col items-end">
          {course.discountPrice ? (
            <>
              <span className="text-lg font-bold text-green-600">
                Rs.{course.discountPrice}
              </span>
              <span className="text-xs text-gray-500 line-through">
                Rs.{course.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-medium text-gray-800">
              Rs.{course.price}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-blue-500" />
          <span>Duration: {course.duration}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <TvMinimal size={16} className="text-purple-500" />
          <span>Course Type: {course.type}</span>
        </div>
      </div>

      {course.discountPrice > 0 && (
        <div className="flex items-center gap-2 p-2 mt-3 text-sm text-yellow-800 bg-yellow-100 rounded-md">
          <AlertCircle size={16} />
          <span>Limited time offer! Save {calculateDiscountPercentage()}%</span>
        </div>
      )}
    </Link>
  );
}

export default CourseComponent;
