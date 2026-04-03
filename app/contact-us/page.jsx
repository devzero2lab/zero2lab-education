"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "sonner";
import {
  FiMail,
  FiPhone,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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
        name:
          `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User",
        email: user?.emailAddresses[0]?.emailAddress || "",
        message: message.trim(),
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
    <div className={montserrat.className}>
      <Head>
        <title>Contact Us | Zero2lab Education LMS</title>
        <meta
          name="description"
          content="Contact Zero2lab Education LMS for support and inquiries"
        />
      </Head>

      <div className="mt-[120px] mb-20 w-full max-w-[1300px] mx-auto px-6 md:px-12">
        <main className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl md:text-5xl font-extrabold text-[#090D24]">
              Get in Touch
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-600">
              We&apos;re here to help and answer any questions you might have.
              Our team usually responds within 24 hours.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form Section */}
            <div className="p-8 md:p-10 bg-white border-2 border-gray-200 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
                <div className="p-3 bg-[#D9FFA5] border-2 border-[#090D24] rounded-2xl">
                  <FiMessageSquare className="w-6 h-6 text-[#090D24]" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-extrabold text-[#090D24]">
                  Send us a message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-bold text-[#090D24]">
                      <FiUser className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={
                        `${user?.firstName || ""} ${
                          user?.lastName || ""
                        }`.trim() || "User"
                      }
                      disabled
                      className="w-full px-5 py-4 font-medium border-2 border-gray-200 rounded-2xl bg-gray-50 text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-bold text-[#090D24]">
                      <FiMail className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={user?.emailAddresses[0]?.emailAddress || ""}
                      disabled
                      className="w-full px-5 py-4 font-medium border-2 border-gray-200 rounded-2xl bg-gray-50 text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-bold text-[#090D24]">
                      <FiSend className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                      Your Message
                    </label>
                    <textarea
                      rows="5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full px-5 py-4 font-medium border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-[#090D24]/10 focus:border-[#090D24] transition-all bg-white"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 flex items-center justify-center gap-2 bg-[#090D24] hover:bg-black text-white font-extrabold rounded-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-5 h-5 text-white animate-spin"
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
                      <FiSend className="w-5 h-5" strokeWidth={2.5} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-8">
              {/* Contact Details Card */}
              <div className="p-8 md:p-10 bg-white border-2 border-gray-200 rounded-[2rem] shadow-sm">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
                  <div className="p-3 bg-[#D9FFA5] border-2 border-[#090D24] rounded-2xl">
                    <FiPhone className="w-6 h-6 text-[#090D24]" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#090D24]">
                    Contact Info
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Email Info */}
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-gray-100 rounded-[1rem]">
                      <FiMail className="w-6 h-6 text-[#090D24]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-[#090D24]">
                        Email
                      </h3>
                      <a
                        href="mailto:info.zero2lab@gmail.com"
                        className="text-base font-medium text-gray-600 transition-colors hover:text-[#090D24] hover:underline"
                      >
                        info.zero2lab@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone Info */}
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-gray-100 rounded-[1rem]">
                      <FiPhone className="w-6 h-6 text-[#090D24]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-[#090D24]">
                        Phone
                      </h3>
                      <a
                        href="tel:0765752518"
                        className="text-base font-medium text-gray-600 transition-colors hover:text-[#090D24] hover:underline"
                      >
                        0765752518
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us Card */}
              <div className="p-8 md:p-10 bg-[#f8ffec] border-2 border-[#D9FFA5] rounded-[2rem]">
                <h3 className="mb-5 text-xl font-extrabold text-[#090D24]">
                  Why contact us?
                </h3>
                <ul className="space-y-4 text-base font-medium text-[#090D24]/80">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#090D24] rounded-full shrink-0" />
                    Technical support and troubleshooting
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#090D24] rounded-full shrink-0" />
                    Course enrollment inquiries
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#090D24] rounded-full shrink-0" />
                    Partnership and collaboration opportunities
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#090D24] rounded-full shrink-0" />
                    Feedback and suggestions
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#090D24] rounded-full shrink-0" />
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
