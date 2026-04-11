"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const reviews = [
  {
    id: 1,
    text: "First of all, I must thank a million times to Mr.Tharusha for conducting the full stack development course at the very beginning of 2024. Web development was the field I hated the most until I joined this course and it made me a beginner to a more proficient coder. Working with Mr.Tharusha was a fantastic experience and his teaching skills are amazing. I highly recommend this course to anybody at any time. Grateful for your guidance, Tharusha, and may success accompany you every step of the way.",
    image: "/images/students/Fazla Fiyas.jpg",
    name: "Fazla Fiyas",
  },
  {
    id: 2,
    text: "Enrolling in this Full Stack Development course was a best decision I made at the beginning of 2024. When I started the course I was at beginner level, but now I have increased my skills and my passion for coding. Especially through this course, I was able to learn JavaScript very well. I think it was a great opportunity to get to know Tharusha and work with him. Through his teaching, he treated us like a brother and taught us in detail about Web Development. Thank you so much Tharusha. Wishing you all the best along each step of your journey.",
    image: "/images/students/Sithum Suraweera.jpg",
    name: "Sithum Suraweera",
  },
  {
    id: 3,
    text: "To be honest, I don't know how to express my thoughts in such a big way. But the best decision I made for the year 2024 is that I decided to do this course. Because there is a big difference between the situation I was in the beginning and the situation I am in now as a person who is going to work in my industry. As a person who knows something, thank you, Tharusha, for helping me to reach this kind of place. I wish you a good future.❤️",
    image: "/images/students/Anushanga Munasinghe.jpg",
    name: "Anushanga Munasinghe",
  },
  {
    id: 4,
    text: "I joined this course with the begginer knowledge.But now i have improve much more.All of it because the course that conducted by mr.Tharusha.He was a ver humble and very talanted teacher.Previously i hate this full stack but now i have been liked to do as now i am know how to do correctly.This course is so effective and helpfull.I will highly recommend this to anyone.Thank you so much sir.",
    image: "/images/students/Amanda Bandara.jpg",
    name: "Amanda Bandara",
  },
  {
    id: 5,
    text: "As a student who goes to campus, this course meant a lot to me. HTML, CSS, Java script, Mern stack were taught properly.thank you very much.",
    image: "/images/students/Mihili Marasinghe.jpg",
    name: "Mihili Marasinghe",
  },
  {
    id: 6,
    text: "really effective .thank you very much for your support and guidance. This course means a lot to me at this time.",
    image: "/images/students/Denuwan Sathsara.jpg",
    name: "Denuwan Sathsara",
  },
];

const MAX_LENGTH = 140;

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className={`flex-shrink-0 w-[300px] md:w-[360px] p-6 md:p-8 text-center bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm my-4 flex flex-col items-center ${montserrat.className}`}>
      {/* Avatar and Name */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <Image
          src={review.image}
          alt={review.name}
          width={64}
          height={64}
          className="object-cover w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-100 shadow-sm"
        />
        <div className="text-left">
          <span className="font-bold text-[#090D24] text-base block leading-tight">{review.name}</span>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-sm md:text-[0.9rem] font-medium text-gray-600 leading-relaxed flex-grow">
        &quot;{expanded || review.text.length <= MAX_LENGTH
          ? review.text
          : `${review.text.slice(0, MAX_LENGTH)}...`}&quot;
      </p>

      {review.text.length > MAX_LENGTH && (
        <button
          onClick={toggleExpanded}
          className="mt-4 font-bold text-sm text-[#090D24] hover:text-gray-600 transition-colors underline underline-offset-2"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const Reviews = () => {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className={`relative w-full py-16 md:py-24 ${montserrat.className}`}>
      {/* Section Header — now inside the component */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 text-center mb-8 md:mb-12">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3 block">
          Testimonials
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#090D24]">
          See for yourself what others think
        </h2>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays for the edges */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-24 md:w-32 bg-gradient-to-r from-[#FBFBFE] to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-24 md:w-32 bg-gradient-to-l from-[#FBFBFE] to-transparent"></div>
        </div>

        <motion.div
          className="flex items-stretch gap-5 md:gap-6"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 60,
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
