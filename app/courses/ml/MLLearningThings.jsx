import React from "react";
import Image from "next/image";
import Link from "next/link";

// Skills array with image imports
const skills = [
  { name: "Anaconda", img: "/images/courses/ml/anaconda.jpg" },
  { name: "Jupyter Notebook", img: "/images/courses/ml/jupyter.jpg" },
  { name: "Python", img: "/images/courses/ml/python.jpg" },
  { name: "Matplotlib", img: "/images/courses/ml/Matplotlib.jpg" },
  { name: "Numpy", img: "/images/courses/ml/numpy.jpg" },
];

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
          <li>Why Python Programming</li>
          <li>Data Types and Operators</li>
          <li>Data Structures in Python</li>
          <li>Control Flow</li>
          <li>Functions</li>
          <li>Scripting</li>
          <li>Introduction to Object Oriented Programming</li>
          <li>Anaconda</li>
          <li>Jupyter Notebooks</li>
          <li>NumPy</li>
          <li>Pandas</li>
          <li>Matplotlib and Seaborn Part 1</li>
          <li>Matplotlib and Seaborn Part 2</li>
          <li>Linear Algebra Introduction</li>
          <li>Vectors</li>
          <li>Linear Combination</li>
          <li>Linear Transformation and Matrices</li>
          <li>Vectors Lab</li>
          <li>Linear Combination Lab</li>
          <li>Linear Mapping Lab</li>
          <li>Linear Algebra in Neural Networks</li>
          <li>Intro to Machine Learning</li>
          <li>Linear Regression</li>
          <li>Logistic Regression</li>
          <li>Decision Trees</li>
          <li>Naive Bayes</li>
          <li>Support Vector Machines</li>
          <li>Ensemble Methods</li>
          <li>Regression Models</li>
          <li>Classification Basics</li>
          <li>Practical Exercises</li>
          <li>Clustering</li>
          <li>Dimensionality Reduction</li>
          <li>Practical Exercises</li>
          <li>End to End ML Project</li>
          <li>Model Deployment Basics</li>
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
