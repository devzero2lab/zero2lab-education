import React from "react";
import Head from "next/head";

function AboutUs() {
  return (
    <div>
      <Head>
        <title>About Us | Zero2lab Education LMS</title>
        <meta name="description" content="Learn more about Zero2lab LMS" />
      </Head>
      <div className="min-h-screen px-6 py-12 bg-gray-100">
        <main className="p-8 mx-auto space-y-12">
          <h1 className="text-4xl font-extrabold ">About Us</h1>
          <p className="text-lg text-gray-700">
            Welcome to Zero2 LMS - Empowering your learning journey.
          </p>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                Who We Are
              </h2>
              <p className="text-lg text-gray-800">
                Zero2 LMS is a Learning Management System designed to make
                learning more accessible, engaging, and personalized. We provide
                an interactive platform that helps students and professionals
                enhance their skills through online courses. Our mission is to
                revolutionize the way education is delivered by making learning
                a fun, flexible, and personalized experience for everyone.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                Our Mission
              </h2>
              <p className="text-lg text-gray-800">
                Our mission is to bridge the gap between traditional education
                and modern digital learning. We aim to provide an intuitive
                platform that empowers learners to reach their full potential.
                Whether you are looking to advance your career, learn a new
                skill, or deepen your knowledge in a specific subject, Zero2 LMS
                is here to support your educational journey.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                Our Values
              </h2>
              <ul className="pl-6 space-y-2 text-lg text-gray-700 list-disc">
                <li>
                  Commitment to Accessibility: We ensure that learning is
                  accessible to everyone, regardless of background or location.
                </li>
                <li>
                  Innovation in Education: We are continuously evolving our
                  platform to incorporate the latest educational tools and
                  techniques.
                </li>
                <li>
                  Personalized Learning: We believe that every learner is unique
                  and provide customized learning experiences that cater to
                  individual needs.
                </li>
                <li>
                  Community Focused: We are building a community of learners,
                  instructors, and innovators who are passionate about knowledge
                  sharing.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                Meet the Team
              </h2>
              <p className="text-lg text-gray-800">
                Our team consists of passionate educators, developers, and
                designers committed to making learning easier and more
                enjoyable. With diverse expertise and a shared vision, we work
                together to create a platform that brings out the best in our
                learners.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                Contact Us
              </h2>
              <p className="text-lg text-gray-800">
                We would love to hear from you ! Whether you have feedback,
                questions, or just want to say hello, feel free to get in touch
                with us:
              </p>
              <ul className="pl-6 space-y-2 text-lg text-gray-700 list-none">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info.zero2lab@gmail.com"
                    className="text-indigo-600 hover:underline"
                  >
                    info.zero2lab@gmail.com
                  </a>
                </li>
                <li>
                  Phone: <span className="text-indigo-600">0765752518</span>
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
