"use client";
import React, { useState } from "react";

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Zero2Learn LMS ?",
      answer:
        "Zero2Learn LMS is an online learning platform where students can enroll in courses such as Full Stack Web Development, Mobile App Development, and Machine Learning.",
    },
    {
      question: "Do I get a certificate after completing a course ?",
      answer:
        "Yes ! Upon successfully completing a course, you will receive a certificate of completion.",
    },
    {
      question: "How do I enroll in a course ?",
      answer:
        "You can browse our available courses, select the one you're interested in, and complete the payment process. After successful payment, you will get access to the course content.",
    },
    {
      question: "How long do I have access to a course after enrolling ?",
      answer:
        "Once enrolled, you will have lifetime access to the course content, including future updates.",
    },
    {
      question: "Can I access the courses on my mobile device ?",
      answer:
        "Yes ! Our LMS is fully responsive, allowing you to access courses from any device, including smartphones and tablets.",
    },
    {
      question: "Are there any prerequisites for the courses ?",
      answer:
        "Some courses may require basic knowledge of programming, while others start from scratch. Please check the course details for prerequisites.",
    },
    {
      question: "What payment methods do you accept ?",
      answer: "We accept bank transfer payments.",
    },
    {
      question: "Can I download the course videos ?",
      answer:
        "No, to protect the course content, videos cannot be downloaded. However, you can stream them anytime from your account.",
    },
    {
      question: "What should I do if I have questions during the course ?",
      answer: "You can schedule a meeting via the LMS dashboard.",
    },
    {
      question: "Who do I contact for technical support ?",
      answer:
        "You can reach our support team via email at info.zero2lab@gmail.com.",
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-4xl px-6 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#5c19e7] to-[#0085fe] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about Zero2Learn LMS.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-6 focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-left text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-6 transition-all duration-300 ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Still have questions? We&apos;re here to help !
          </p>
          <a
            href="mailto:info.zero2lab@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-[#5c19e7] text-white font-semibold rounded-lg hover:bg-[#0085fe] transition-colors duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
