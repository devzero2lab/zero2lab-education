import Image from "next/image";
import Link from "next/link";
import React from "react";

function Features() {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and more! Build real projects and deploy your portfolio.",
      duration: "24h 40m",
      image: "/images/homepage/course1.png",
      instructors: ["/images/avatars/avatar1.jpg", "/images/avatars/avatar2.jpg", "/images/avatars/avatar3.jpg"],
      rating: 4.9,
      reviews: 2385,
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "Master Python for Data Science",
      description:
        "Learn Python, NumPy, Pandas, and machine learning algorithms to excel in data science and AI.",
      duration: "30h 15m",
      image: "/images/homepage/fwd.png",
      instructors: ["/images/avatars/avatar4.jpg", "/images/avatars/avatar5.jpg"],
      rating: 4.8,
      reviews: 1850,
      badge: "Top Rated",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description:
        "Understand the principles of user interface and user experience design, and create stunning designs.",
      duration: "18h 50m",
      image: "/images/homepage/mad.png",
      instructors: ["/images/avatars/avatar6.jpg"],
      rating: 4.7,
      reviews: 1320,
      badge: "Popular",
    },
  ];

  return (
    <section className="relative z-30 flex flex-col items-center w-full pb-16 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-7">
        <h2 className="mb-4 text-5xl font-bold text-gray-900 font-inter">
          Most Popular Courses
        </h2>
        <p className="text-xl text-gray-600">
          Master new skills with our best-selling courses
        </p>
      </div>

      <div className="grid  max-w-7xl grid-cols-1 gap-8 px-5 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out"
          >
            <Link href="/courses" className="block " aria-label={`Course: ${course.title}`}>
              {/* Course Image */}
              <div className="overflow-hidden rounded-xl">
                <Image
                  width={600}
                  height={440}
                  className="object-contain w-full  transition-transform duration-300 group-hover:scale-105"
                  src={course.image}
                  alt={course.title}
                />
              </div>

            </Link>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <Link
          href="/courses"
          className="px-8 py-3 text-lg font-semibold text-white transition-all transform bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:scale-105 hover:shadow-xl"
        >
          View All Courses
        </Link>
      </div>
    </section>
  );
}

export default Features;
