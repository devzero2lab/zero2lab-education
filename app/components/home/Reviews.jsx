"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

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

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const MAX_LENGTH = 140; // Maximum characters before truncation

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className={`flex-shrink-0 w-[320px] md:w-[380px] p-8 text-center bg-white border-2 border-[#090D24] rounded-[2rem] shadow-sm my-4 flex flex-col items-center ${montserrat.className}`}>
      <div className="flex items-center justify-center gap-4 mb-4">
        <img
          src={review.image}
          alt={review.name}
          className="object-cover w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 shadow-inner"
        />
        <span className="font-extrabold text-[#090D24] text-lg">{review.name}</span>
      </div>
      <p
        className={`text-sm md:text-base font-medium text-[#090D24] leading-relaxed flex-grow`}
      >
        "{expanded || review.text.length <= MAX_LENGTH
          ? review.text
          : `${review.text.slice(0, MAX_LENGTH)}...`}"
      </p>
      {review.text.length > MAX_LENGTH && (
        <button
          onClick={toggleExpanded}
          className="mt-4 font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const Reviews = () => {
  const duplicatedReviews = [...reviews, ...reviews]; // Duplicate for infinite scroll effect

  return (
    <div className={`relative w-full overflow-hidden bg-white py-12 ${montserrat.className}`}>
      {/* Gradient overlays for the edges */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Scrolling Slider */}
      <motion.div
        className="flex items-stretch gap-6"
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          ease: "linear",
          duration: 60, // Adjust speed here
          repeat: Infinity,
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </motion.div>
    </div>
  );
};

export default Reviews;
