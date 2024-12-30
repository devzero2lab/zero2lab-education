import React from "react";
import Head from "next/head";

function ContactUs() {
  return (
    <div>
      <Head>
        <title>Contact Us | Zero2lab Education LMS</title>
        <meta
          name="description"
          content="Contact Zero2lab Education LMS for support and inquiries"
        />
      </Head>
      <div className="min-h-screen px-6 py-12 bg-gray-50">
        <main className="p-8 mx-auto space-y-12 ">
          <h1 className="text-4xl font-extrabold text-center text-indigo-600">
            Contact Us
          </h1>
          <p className="text-lg text-center text-gray-700">
            Have any questions or feedback ? we would love to hear from you !
          </p>

          <section className="space-y-8">
            {/* Contact Form */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-indigo-700">
                Get in Touch
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-indigo-700">
                  Our Contact Info
                </h2>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:info.zero2lab@gmail.com"
                      className="text-indigo-600 hover:underline"
                    >
                      info.zero2lab@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span>{" "}
                    <span className="text-indigo-600">0765752518</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ContactUs;
