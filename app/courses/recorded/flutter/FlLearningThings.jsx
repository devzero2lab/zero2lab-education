import React from "react";
import Image from "next/image";
import Link from "next/link";

// Skills array with image imports
const skills = [{ name: "dart", img: "/images/courses/flutter/dart.jpg" }];

function MLLearningThings() {
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
          <li>Introduction to Flutter</li>
          <li>Setting Up Flutter and Dart</li>
          <li>Understanding Flutter Architecture</li>
          <li>Dart Basics</li>
          <li>Widgets Overview</li>
          <li>Stateless vs Stateful Widgets</li>
          <li>Building Responsive UIs</li>
          <li>Layouts in Flutter</li>
          <li>Handling User Input</li>
          <li>Navigation and Routing</li>
          <li>State Management Basics</li>
          <li>Using Provider for State Management</li>
          <li>Networking and APIs</li>
          <li>Working with Lists</li>
          <li>Introduction to Animations</li>
          <li>Forms and Validation</li>
          <li>Handling Media: Images and Icons</li>
          <li>Introduction to Firebase</li>
          <li>Adding Authentication</li>
          <li>Storing Data in Firestore</li>
          <li>Basic Testing in Flutter</li>
          <li>Publishing Your App</li>
          <li>Practical Exercises</li>
          <li>Mini App Development Project</li>
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

export default MLLearningThings;
