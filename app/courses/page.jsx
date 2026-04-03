// ✅ Server Component — no "use client", no useEffect, no axios
// Data is cached for 5 minutes — DB is not hit on every visit
import React from "react";
import CourseComponent from "./components/CourseComponent";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const WhatsAppButton = () => (
  <Link
    href="https://wa.me/message/F5NEXMTYXSFYL1"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 flex items-center space-x-3 bg-[#128C7E] px-6 py-3 rounded-full shadow-lg hover:bg-[#1b6159] transition-all duration-300 group animate-bounce-slow"
    aria-label="Chat on WhatsApp"
  >
    <span className="text-sm font-medium text-white md:text-base">
      Chat with us
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6 h-6 text-white md:w-8 md:h-8 shrink-0"
    >
      <path
        fill="currentColor"
        d="M19.077 4.928C17.191 3.041 14.683 2.001 12.011 2c-5.506 0-9.987 4.479-9.989 9.985-.001 1.76.459 3.478 1.333 4.992L2 22l5.233-1.237c1.459.812 3.115 1.235 4.778 1.234h.001c5.505 0 9.986-4.48 9.989-9.985.001-2.677-1.042-5.182-2.924-7.084zm-7.066 14.31h-.002c-1.37 0-2.697-.368-3.868-1.067l-.276-.164-2.879.761.769-2.802-.18-.279a8.321 8.321 0 0 1-1.285-4.426c.002-4.625 3.772-8.398 8.407-8.398 2.25 0 4.368.877 5.958 2.467a8.362 8.362 0 0 1 2.467 5.958c-.003 4.632-3.775 8.398-8.401 8.398zm4.65-6.239c-.246-.123-1.456-.719-1.682-.801-.226-.084-.392-.124-.557.123-.166.247-.643.8-.788.967-.145.166-.29.187-.538.062-.247-.123-1.045-.385-1.988-1.232-.734-.654-1.231-1.462-1.375-1.709-.144-.247-.015-.381.109-.504.112-.112.247-.289.371-.434.124-.144.165-.247.247-.412.083-.164.041-.309-.02-.434-.061-.124-.557-1.344-.763-1.841-.204-.497-.409-.429-.557-.433-.147-.004-.315-.004-.483-.004-.168 0-.441.063-.673.309-.232.247-.893.872-.893 2.126 0 1.254.915 2.465 1.043 2.632.128.166 1.8 2.74 4.373 3.851.597.258 1.064.413 1.427.528.577.184 1.103.158 1.519.096.457-.068 1.456-.595 1.66-1.168.205-.574.205-1.066.143-1.168-.061-.101-.225-.164-.472-.287z"
      />
    </svg>
  </Link>
);

async function RecordCoursesPage() {
  let courses = [];
  let error = null;

  try {
    // ✅ Server-side fetch with 5-minute cache — no client bundle overhead
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("Failed to fetch courses");
    const data = await res.json();
    courses = data.courses || [];
  } catch (err) {
    error = err.message || "Failed to fetch courses";
  }

  return (
    <div className={`mt-[120px] mb-20 w-full max-w-[1300px] mx-auto px-6 md:px-12 ${montserrat.className}`}>
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#090D24]">
          Explore Our Courses
        </h1>
        <p className="mt-3 text-base text-gray-500 font-medium max-w-2xl mx-auto">
          Advance your career with our expertly crafted, industry-relevant programs.
        </p>
      </div>

      {error ? (
        <div className="text-center font-bold text-red-500 mt-10 p-8 border border-red-200 rounded-2xl bg-red-50">{error}</div>
      ) : courses.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {courses.map((course) => (
            <CourseComponent key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center font-medium text-gray-500 mt-10 p-8 border border-gray-200 rounded-2xl bg-gray-50">No courses available</div>
      )}

      <WhatsAppButton />
    </div>
  );
}

export default RecordCoursesPage;

