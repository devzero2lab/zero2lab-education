import React from "react";
import Head from "next/head";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function AboutUs() {
  return (
    <div className={montserrat.className}>
      <Head>
        <title>About Us | zero2lab LMS</title>
        <meta name="description" content="Learn more about zero2lab LMS" />
      </Head>
      <div className="mt-[120px] mb-20 w-full max-w-[1300px] mx-auto px-6 md:px-12">
        <main className="p-8 md:p-16 border-2 border-gray-200 rounded-[2rem] bg-white space-y-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#090D24] mb-4">About Us</h1>
            <p className="text-lg md:text-xl font-medium text-gray-600">
              Welcome to zero2lab LMS - Empowering your learning journey.
            </p>
          </div>

          <section className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                Who We Are
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                zero2lab LMS is a Learning Management System designed to make
                learning more accessible, engaging, and personalized. We provide
                an interactive platform that helps students and professionals
                enhance their skills through online courses. Our mission is to
                revolutionize the way education is delivered by making learning
                a fun, flexible, and personalized experience for everyone.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                Our Mission
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                Our mission is to bridge the gap between traditional education
                and modern digital learning. We aim to provide an intuitive
                platform that empowers learners to reach their full potential.
                Whether you are looking to advance your career, learn a new
                skill, or deepen your knowledge in a specific subject,
                zero2lab LMS is here to support your educational journey.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                Our Values
              </h2>
              <ul className="pl-6 space-y-3 text-base md:text-lg text-gray-700 list-disc font-medium">
                <li>
                  <span className="font-bold text-[#090D24]">Commitment to Accessibility:</span> We ensure that learning is
                  accessible to everyone, regardless of background or location.
                </li>
                <li>
                  <span className="font-bold text-[#090D24]">Innovation in Education:</span> We are continuously evolving our
                  platform to incorporate the latest educational tools and
                  techniques.
                </li>
                <li>
                  <span className="font-bold text-[#090D24]">Personalized Learning:</span> We believe that every learner is unique
                  and provide customized learning experiences that cater to
                  individual needs.
                </li>
                <li>
                  <span className="font-bold text-[#090D24]">Community Focused:</span> We are building a community of learners,
                  instructors, and innovators who are passionate about knowledge
                  sharing.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                Meet the Team
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                Our team consists of passionate educators, developers, and
                designers committed to making learning easier and more
                enjoyable. With diverse expertise and a shared vision, we work
                together to create a platform that brings out the best in our
                learners.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                Contact Us
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                We would love to hear from you! Whether you have feedback,
                questions, or just want to say hello, feel free to get in touch
                with us:
              </p>
              <ul className="pl-6 space-y-2 text-base md:text-lg font-bold text-[#090D24] list-none mt-4">
                <li className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">Email:</span>{" "}
                  <a
                    href="mailto:info.zero2lab@gmail.com"
                    className="text-[#090D24] hover:text-blue-600 hover:underline transition-colors"
                  >
                    info.zero2lab@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">Phone:</span>
                  <span>0765752518</span>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AboutUs;
