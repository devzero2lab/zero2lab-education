import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  { name: "Anaconda", img: "/images/courses/ml/anaconda.jpg", emoji: "🐍" },
  { name: "Jupyter", img: "/images/courses/ml/jupyter.jpg", emoji: "📓" },
  { name: "Python", img: "/images/courses/ml/python.jpg", emoji: "🐍" },
  { name: "Matplotlib", img: "/images/courses/ml/Matplotlib.jpg", emoji: "📊" },
  { name: "Numpy", img: "/images/courses/ml/numpy.jpg", emoji: "🔢" },
];

const courseSchedule = [
  {
    week: 1,
    title: "Introduction to Python for AI Programmers",
    days: [
      {
        day: 1,
        topics: ["Why Python Programming"],
        video: "https://youtube.com/lesson-1",
        fastTrack: true,
        duration: "2h"
      },
      {
        day: 2,
        topics: ["Data Types and Operators"],
        video: "https://youtube.com/lesson-2",
        duration: "2h"
      },
      {
        day: 3,
        topics: ["Data Structures in Python"],
        video: "https://youtube.com/lesson-3",
        duration: "2h"
      },
      {
        day: 4,
        topics: ["Control Flow"],
        video: "https://youtube.com/lesson-5",
        duration: "2h"
      },
      {
        day: 5,
        topics: ["Functions"],
        video: "https://youtube.com/lesson-6",
        duration: "2h"
      },
      {
        day: 6,
        topics: ["Scripting"],
        video: "https://youtube.com/lesson-7",
        duration: "2h"
      },
      {
        day: 7,
        topics: ["Introduction to Object-Oriented Programming"],
        video: "https://youtube.com/lesson-8",
        duration: "2h"
      }
    ]
  },
  {
    week: 2,
    title: "Numpy, Pandas, Matplotlib",
    days: [
      {
        day: 1,
        topics: ["Anaconda"],
        video: "https://youtube.com/lesson-9",
        fastTrack: true,
        duration: "2h"
      },
      {
        day: 2,
        topics: ["Jupyter Notebooks"],
        video: "https://youtube.com/lesson-10",
        duration: "2h"
      },
      {
        day: 3,
        topics: ["NumPy"],
        video: "https://youtube.com/lesson-11",
        duration: "2h"
      },
      {
        day: 4,
        topics: ["Pandas"],
        video: "https://youtube.com/lesson-12",
        duration: "2h"
      },
      {
        day: 5,
        topics: ["Matplotlib and Seaborn Part 1"],
        video: "https://youtube.com/lesson-13",
        duration: "2h"
      },
      {
        day: 6,
        topics: ["Matplotlib and Seaborn Part 2"],
        video: "https://youtube.com/lesson-14",
        duration: "2h"
      }
    ]
  },
  {
    week: 3,
    title: "Linear Algebra Essentials",
    days: [
      {
        day: 1,
        topics: ["Introduction to Linear Algebra"],
        video: "https://youtube.com/lesson-15",
        fastTrack: true,
        duration: "2h"
      },
      {
        day: 2,
        topics: ["Vectors"],
        video: "https://youtube.com/lesson-16",
        duration: "2h"
      },
      {
        day: 3,
        topics: ["Linear Combination"],
        video: "https://youtube.com/lesson-17",
        duration: "2h"
      },
      {
        day: 4,
        topics: ["Linear Transformation and Matrices"],
        video: "https://youtube.com/lesson-18",
        duration: "2h"
      },
      {
        day: 5,
        topics: ["Vectors Lab"],
        video: "https://youtube.com/lesson-19",
        duration: "2h"
      },
      {
        day: 6,
        topics: ["Linear Combination Lab"],
        video: "https://youtube.com/lesson-20",
        duration: "2h"
      },
      {
        day: 7,
        topics: ["Linear Mapping Lab"],
        video: "https://youtube.com/lesson-21",
        duration: "2h"
      },
      {
        day: 8,
        topics: ["Linear Algebra in Neural Networks"],
        video: "https://youtube.com/lesson-22",
        duration: "2h"
      }
    ]
  },
  {
    week: 4,
    title: "Intro to Machine Learning",
    days: [
      {
        day: 1,
        topics: ["Course Introduction"],
        video: "https://youtube.com/lesson-23",
        fastTrack: true,
        duration: "2h"
      },
      {
        day: 2,
        topics: ["Linear Regression"],
        video: "https://youtube.com/lesson-25",
        duration: "2h"
      },
      {
        day: 3,
        topics: ["Logistic Regression"],
        video: "https://youtube.com/lesson-26",
        duration: "2h"
      },
      {
        day: 4,
        topics: ["Decision Trees"],
        video: "https://youtube.com/lesson-27",
        duration: "2h"
      },
      {
        day: 5,
        topics: ["Naive Bayes"],
        video: "https://youtube.com/lesson-28",
        duration: "2h"
      },
      {
        day: 6,
        topics: ["Support Vector Machines"],
        video: "https://youtube.com/lesson-29",
        duration: "2h"
      },
      {
        day: 7,
        topics: ["Ensemble Methods"],
        video: "https://youtube.com/lesson-30",
        duration: "2h"
      },
      {
        day: 8,
        topics: ["Course Recap"],
        video: "https://youtube.com/lesson-31",
        duration: "2h"
      }
    ]
  },
  {
    week: 5,
    title: "Advanced ML and Projects",
    days: [
      {
        day: 1,
        topics: ["Regression Models"],
        video: "https://youtube.com/lesson-32",
        fastTrack: true,
        duration: "2h"
      },
      {
        day: 2,
        topics: ["Classification Basics"],
        video: "https://youtube.com/lesson-33",
        duration: "2h"
      },
      {
        day: 3,
        topics: ["Practical Exercises (Supervised)"],
        video: "https://youtube.com/lesson-34",
        duration: "2h"
      },
      {
        day: 4,
        topics: ["Clustering"],
        video: "https://youtube.com/lesson-35",
        duration: "2h"
      },
      {
        day: 5,
        topics: ["Dimensionality Reduction"],
        video: "https://youtube.com/lesson-36",
        duration: "2h"
      },
      {
        day: 6,
        topics: ["Practical Exercises (Unsupervised)"],
        video: "https://youtube.com/lesson-37",
        duration: "2h"
      },
      {
        day: 7,
        topics: ["End-to-End ML Project"],
        video: "https://youtube.com/lesson-38",
        duration: "2h"
      },
      {
        day: 8,
        topics: ["Model Deployment Basics"],
        video: "https://youtube.com/lesson-39",
        duration: "2h"
      }
    ]
  }
];

function MLLearningThings() {
  const [openWeeks, setOpenWeeks] = useState([]);

  const toggleWeek = (weekIndex) => {
    setOpenWeeks(prev =>
      prev.includes(weekIndex)
        ? prev.filter(index => index !== weekIndex)
        : [...prev, weekIndex]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="px-6 pt-20 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex-1"
          >
            <Image
              src="/images/courses/ml/cimage.jpeg"
              alt="Happy Kids Coding"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full blur-xl opacity-30" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🤖 Create AI Magic! 🎩✨
            </h1>
            <p className="text-xl text-gray-600">
              Become a Machine Learning Wizard with Python! Build smart robots, predict the future, and make computers learn like magic!
            </p>
            <div className="flex gap-4">
              <Link href="#curriculum" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                See Curriculum 📚
              </Link>
              <Link href="/enroll" className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                Enroll Now 🚀
              </Link>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Skills Section */}
      <section className="md:px-4 sm:px-6 py-3 lg:py-3">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-0">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-4 sm:p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Image Container with Shine Effect */}
                  <div className="relative p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="w-10 h-10 sm:w-10 sm:h-10 object-contain rounded-md"
                      loading="lazy"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 justify-center items-center min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                      {skill.name}
                    </h3>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Accordion */}
      <section id="curriculum" className="md:px-6 py-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            📚 Learning Adventure Map
          </h2>

          <div className="space-y-4">
            {courseSchedule.map((week, weekIndex) => (
              <div key={weekIndex} className="border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleWeek(weekIndex)}
                  className="w-full p-6 text-left bg-white hover:from-blue-100 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-700 text-white rounded-lg">
                        <span className="text-xl">W{week.week}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{week.title}</h3>
                        <p className="text-gray-500 mt-1">
                          {week.days.length} Days • 🕒{' '}
                          {week.days.reduce((sum, day) => sum + parseFloat(day.duration), 0)}h
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openWeeks.includes(weekIndex) ? 180 : 0 }}
                      className="text-blue-500"
                    >
                      ▼
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openWeeks.includes(weekIndex) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid gap-4 mt-2">
                        {week.days.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className="p-4  bg-gray-50 rounded-lg border border-blue-100"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-blue-500 text-white rounded-full">
                                  Day {day.day}
                                </span>
                                
                              </div>
                              <span className="text-sm text-gray-500">
                                🕒 {day.duration}
                              </span>
                            </div>

                            <ul className="space-y-2  pl-4">
                              {day.topics.map((topic, topicIndex) => (
                                <li
                                  key={topicIndex}
                                  className="flex items-center before:content-['▹'] before:text-blue-400 before:mr-2"
                                >
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>

            ))}
          </div>

          <div className="text-center mt-8">
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
      </section>

      

      {/* Certificate Section */}
      <section className="md:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            🏆 Earn Your AI Wizard Certificate!
          </h2>
          <motion.div
            whileHover={{ rotate: 3 }}
            className="inline-block bg-white p-8 rounded-2xl shadow-xl border-2 border-gold-500"
          >
            <Image
              src="/images/courses/ml/certificate.png"
              width={600}
              height={400}
              alt="AI Wizard Certificate"
              className="rounded-lg"
            />
            <p className="mt-4 text-gray-600">
              Show off your new skills with this awesome achievement!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default MLLearningThings;