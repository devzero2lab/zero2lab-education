import React from "react";
import Image from "next/image";
import Link from "next/link";

// Skills array with image imports
const skills = [
  { name: "React", img: "/images/courses/fullstackweb/react.jpg" },
];

function FDLearningThings() {
  return (
    <div className="p-5 mx-auto  border border-[#2882ff] rounded-lg shadow-md lg:p-10">
      {/* Header */}
      <h2 className="mb-6 text-3xl font-bold text-center">
        Here is how your skillset will shape up
      </h2>

      <div className="flex flex-col items-start justify-between lg:flex-row lg:gap-6">
        {/* Left Side: Logos */}
        <div className="grid grid-cols-3 gap-4 mb-8 lg:mb-0 lg:w-1/2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow"
            >
              <Image
                src={skill.img}
                alt={skill.name}
                width={30}
                height={30}
                className="mb-2"
              />
              <span className="text-gray-700">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Right Side: Skill List */}
        <ul className="space-y-2 text-gray-700 list-disc list-inside lg:w-1/2">
          <li>Introduction to Web Development</li>
          <li>HTML5 Fundamentals</li>
          <li>CSS3 Basics and Responsive Design</li>
          <li>JavaScript Basics and DOM Manipulation</li>
          <li>Version Control with Git and GitHub</li>
          <li>Advanced JavaScript (ES6+ Features)</li>
          <li>Frontend Frameworks (React.js/Angular/Vue.js)</li>
          <li>Building and Styling Components</li>
          <li>State Management in Frontend</li>
          <li>Backend Development with Node.js</li>
          <li>Express.js Framework</li>
          <li>RESTful API Development</li>
          <li>Database Basics</li>
          <li>Working with MongoDB/SQL</li>
          <li>Authentication and Authorization</li>
          <li>Handling File Uploads</li>
          <li>Web Security Basics</li>
          <li>Testing and Debugging</li>
          <li>Introduction to DevOps</li>
          <li>Hosting and Deployment (Netlify, Heroku, AWS)</li>
          <li>Version Control and Collaboration with GitHub</li>
          <li>End-to-End Project Development</li>
          <li>Building a Full-Stack Web Application</li>
          <li>Portfolio Creation and Interview Preparation</li>
        </ul>
      </div>

      {/* Button */}
      <div className="mt-8 ">
        <Link
          href="https://drive.google.com/file/d/10KmM_guPoTf2FUiHFyXgPByhScjTSV-F/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500">
            Download Course Content
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FDLearningThings;
