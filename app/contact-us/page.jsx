"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "sonner";
import { FiMail, FiPhone, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";

function ContactUs() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { isLoaded, isSignedIn, user } = useUser();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isLoaded && !isSignedIn) {
    router.push("/sign-in");
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const contactData = {
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User",
        email: user?.emailAddresses[0]?.emailAddress || "",
        message: message.trim()
      };

      await axios.post(`${apiUrl}/api/contactus`, contactData);
      setMessage("");
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Contact Us | Zero2lab Education LMS</title>
        <meta
          name="description"
          content="Contact Zero2lab Education LMS for support and inquiries"
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <main className="max-w-4xl mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl mt-10 md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have. Our team usually responds within 24 hours.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <FiMessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-700">
                      <FiUser className="w-5 h-5 text-indigo-600" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User"}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-700">
                      <FiMail className="w-5 h-5 text-indigo-600" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={user?.emailAddresses[0]?.emailAddress || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-700">
                      <FiSend className="w-5 h-5 text-indigo-600" />
                      Your Message
                    </label>
                    <textarea
                      rows="5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg 
                        className="animate-spin h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-8">
              {/* Contact Details Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <FiPhone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Email Info */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-indigo-50 rounded-lg">
                      <FiMail className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <a
                        href="mailto:info.zero2lab@gmail.com"
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        info.zero2lab@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone Info */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-indigo-50 rounded-lg">
                      <FiPhone className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <a 
                        href="tel:0765752518"
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                      >
                        0765752518
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us Card */}
              <div className="bg-indigo-50 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Why contact us?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    Technical support and troubleshooting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    Course enrollment inquiries
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    Partnership and collaboration opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    Feedback and suggestions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                    Account and billing questions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContactUs;