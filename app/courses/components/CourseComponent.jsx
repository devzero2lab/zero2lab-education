import Link from "next/link";
import React from "react";
import { BookOpen, Clock, TvMinimal, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

function CourseComponent({ course }) {
  const isDiscounted = course.discountPrice > 0;

  const calculateDiscountPercentage = () => {
    if (!isDiscounted) return 0;
    return Math.round(
      ((course.price - course.discountPrice) / course.price) * 100
    );
  };

  return (
    <Link
      href={`/courses/${course.uniqueName}`}
      className={`group p-5 transition-all duration-300 rounded-2xl flex flex-col w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] relative overflow-hidden ${
        isDiscounted
          ? "bg-white border-2 border-[#090D24] shadow-md hover:shadow-xl"
          : "bg-white border border-gray-200 hover:border-[#090D24] shadow-sm hover:shadow-lg"
      } ${montserrat.className}`}
    >
      {/* Discount Ribbon */}
      {isDiscounted && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 flex items-center justify-center font-bold text-[#090D24] text-xs bg-[#D9FFA5] rounded-full shadow-sm border border-[#090D24]/10">
          🔥 {calculateDiscountPercentage()}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-56 md:h-60 mb-5 overflow-hidden rounded-xl bg-gray-50/50 group-hover:bg-gray-50 transition-colors">
        <Image
          fill
          src={course.image}
          alt={course.title || "Course Image"}
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-bold text-[#090D24] leading-snug pr-2">{course.courseName}</h2>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-5 text-gray-500 font-medium text-sm">
        <div className="flex items-center gap-1.5">
          <TvMinimal size={14} />
          <span>{course.type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>{course.duration}</span>
        </div>
      </div>

      <div className="flex items-end justify-between mt-auto pt-5 border-t border-gray-100">
        <span className="font-bold bg-gray-100 text-[#090D24] px-3 py-1 rounded-full text-xs tracking-wide uppercase">
          {course.level}
        </span>
        <div className="flex flex-col items-end">
          {course.discountPrice ? (
            <>
              <span className="text-xl font-bold text-[#090D24]">
                Rs.{course.discountPrice}
              </span>
              <span className="text-xs text-gray-400 font-medium line-through">
                Rs.{course.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-[#090D24]">
              Rs.{course.price}
            </span>
          )}
        </div>
      </div>

      {course.discountPrice > 0 && (
        <div className="flex items-center gap-2 p-3 mt-4 text-xs font-semibold text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
          <AlertCircle size={14} className="text-[#090D24]" />
          <span>Limited time offer ends soon.</span>
        </div>
      )}
    </Link>
  );
}

export default CourseComponent;
