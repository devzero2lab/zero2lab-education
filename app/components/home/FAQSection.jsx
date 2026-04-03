"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is zero2lab LMS ?",
      answer:
        "zero2lab LMS is an online learning platform where students can enroll in courses such as Full Stack Web Development, Mobile App Development, and Machine Learning.",
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
    <div className={`py-12 md:py-20 ${montserrat.className}`}>
      <div className="max-w-4xl px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#090D24] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-[#090D24] font-medium opacity-80">
            Find answers to common questions about zero2lab LMS.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-5 md:p-8 focus:outline-none bg-white hover:bg-[#f8ffec] transition-colors"
              >
                <h3 className="text-base md:text-lg font-bold text-left text-[#090D24]">
                  {faq.question}
                </h3>
                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-[#090D24] bg-[#D9FFA5] transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}>
                  <svg
                    className={`w-4 h-4 text-[#090D24]`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-5 pb-5 md:px-8 md:pb-8 pt-0 border-t border-gray-100">
                  <p className="text-sm md:text-base font-medium text-gray-700 mt-4">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-12 md:mt-20 text-center">
          <p className="mb-6 text-base md:text-lg font-bold text-[#090D24]">
            Still have questions? We're here to help!
          </p>
          <a
            href="mailto:info.zero2lab@gmail.com"
            className="inline-flex items-center px-8 py-4 bg-[#090D24] text-white font-bold text-lg rounded-full hover:bg-black transition-all shadow-md active:scale-95"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
