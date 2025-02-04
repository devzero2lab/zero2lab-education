import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="py-10 font-sans bg-white border-t border-gray-200 ">
      <div className="container flex flex-wrap justify-between px-4 mx-auto sm:px-8 lg:px-16">
        {/* Brand Logo */}
        <div className="flex flex-col items-center w-full mb-6 sm:w-1/2 lg:w-1/4 lg:mb-0">
          <h2 className="text-2xl font-bold text-indigo-700">Zero2learn</h2>
        </div>

        {/* Products */}
        <div className="flex flex-col items-center w-full mb-6 sm:w-1/2 lg:w-1/4 lg:mb-0">
          <h3 className="mb-3 text-lg font-semibold">Products</h3>
          <ul className="space-y-2">
            <Link href={"/courses"}>
              <li>Courses</li>
            </Link>
            <Link href={"/"}>
              <li>Webinars</li>
            </Link>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center w-full mb-6 sm:w-1/2 lg:w-1/4 lg:mb-0">
          <h3 className="mb-3 text-lg font-semibold">Legal</h3>
          <ul className="space-y-2">
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4">
          <h3 className="mb-3 text-lg font-semibold">Company</h3>
          <ul className="space-y-2">
            <Link href="/about-us">
              <li>About Us</li>
            </Link>
            <Link href="contact-us">
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="pt-4 mt-6 text-center border-gray-200">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Zero2learn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
