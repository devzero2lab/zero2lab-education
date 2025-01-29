import React from "react";
import Image from "next/image";
import Link from "next/link";

// Skills array with image imports
const skills = [
  { name: "HTML", img: "/images/courses/webdev/html.png" },
  { name: "CSS", img: "/images/courses/webdev/css.png" },
  { name: "JavaScript", img: "/images/courses/webdev/javascript.png" },
  { name: "React", img: "/images/courses/webdev/react.png" },
  { name: "Node.js", img: "/images/courses/webdev/node.png" },
  { name: "Express.js", img: "/images/courses/webdev/express.png" },
  { name: "MongoDB", img: "/images/courses/webdev/mongodb.png" },
  { name: "Git & GitHub", img: "/images/courses/webdev/git.png" },
  { name: "REST APIs", img: "/images/courses/webdev/api.png" },
];

function FullStackLearning() {
  return (
    <div className="p-5 mx-auto border border-[#2882ff] rounded-lg shadow-md lg:p-10">
      {/* Header */}
      <h2 className="mb-6 text-3xl font-bold text-center">
        Full-Stack Web Development Learning Path
      </h2>

      <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-6">
        {/* Left Side: Logos */}
        

        {/* Right Side: Skill List */}
        <ul className="space-y-2 text-gray-700 list-disc list-inside ">
          <li>Introduction to Web Development</li>
          <li>HTML Basics & Semantic Markup</li>
          <li>CSS Fundamentals & Responsive Design</li>
          <li>JavaScript ES6+ & DOM Manipulation</li>
          <li>Version Control with Git & GitHub</li>
          <li>Frontend Development with React</li>
          <li>Component-Based Architecture in React</li>
          <li>State Management with React Hooks</li>
          <li>Routing in React with React Router</li>
          <li>Backend Development with Node.js & Express</li>
          <li>Building RESTful APIs</li>
          <li>Working with MongoDB & Mongoose</li>
          <li>Authentication & Authorization (JWT)</li>
          <li>Integrating Third-Party APIs</li>
          <li>Deployment (Vercel)</li>
          <li>Building a Full-Stack MERN Project</li>
        </ul>
      </div>

      
    </div>
  );
}

export default FullStackLearning;
