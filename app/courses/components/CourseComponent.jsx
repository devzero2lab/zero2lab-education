import Link from "next/link";
import React from "react";
import { Clock, TvMinimal } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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
      className={`group flex flex-col bg-white rounded-lg w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#090D24]/30 transition-all duration-300 hover:-translate-y-1 ${montserrat.className}`}
    >
      {/* Image Container - Using aspect-square to match the images and removing padding to span full width */}
      <div className="relative w-full aspect-square bg-[#FDFDFD] border-b border-gray-100 overflow-hidden group-hover:bg-gray-50 transition-colors duration-300">
        <Image
          fill
          src={course.image}
          alt={course.title || "Course Image"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-grow p-6 relative">
        {/* Creative Overlapping Discount Badge - Relocated so it never blocks poster text */}
        {isDiscounted && (
          <div className="absolute -top-[16px] right-6 z-20 px-3.5 py-1 flex items-center justify-center font-black text-white text-[13px] tracking-widest bg-gradient-to-r from-red-600 to-rose-500 rounded-full shadow-lg shadow-red-500/40 border-[3px] border-white">
            {calculateDiscountPercentage()}% OFF
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <span className="font-bold text-[#090D24] text-[10px] uppercase tracking-widest border border-[#090D24]/20 bg-gray-50 px-2 py-0.5 rounded-sm mt-1">
            {course.level}
          </span>
        </div>

        <h2 className="text-[17px] md:text-[19px] font-bold text-[#090D24] leading-snug mb-4 group-hover:text-blue-700 transition-colors line-clamp-2">
          {course.courseName}
        </h2>

        <div className="flex flex-wrap items-center gap-5 mb-6 text-gray-500 font-medium text-[13px]">
          <div className="flex items-center gap-2">
            <TvMinimal size={16} className="text-[#090D24]/60" />
            <span>{course.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#090D24]/60" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-gray-100 flex flex-col justify-between">
          {isDiscounted ? (
             <div className="flex flex-col">
               <div className="flex items-center gap-3 mb-1">
                 <span className="text-sm text-gray-400 font-semibold line-through">
                   Rs. {course.price.toLocaleString()}
                 </span>
                 <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                   Special Price
                 </span>
               </div>
               <span className="text-[22px] font-black text-[#090D24] tracking-tight">
                 Rs. {course.discountPrice.toLocaleString()}
               </span>
             </div>
          ) : (
             <div className="flex flex-col">
               <span className="text-[22px] font-black text-[#090D24] tracking-tight mt-6">
                 Rs. {course.price.toLocaleString()}
               </span>
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseComponent;
