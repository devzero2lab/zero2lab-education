"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className={`pt-16 pb-8 bg-white border-t-2 border-gray-100 ${montserrat.className}`}>
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12 flex flex-wrap justify-between gap-y-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-start w-full sm:w-1/2 lg:w-1/4">
          <h2 className="text-3xl font-extrabold text-[#090D24] tracking-tight">zero2lab</h2>
          <p className="mt-4 text-base font-medium text-gray-500 max-w-[250px]">
            Empowering learners with real-world, quality education.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link
              href="https://www.facebook.com/share/15KN94AeuV/"
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <Image
                src="/images/footer/fb.jpg"
                alt="Facebook"
                width={36}
                height={36}
                className="rounded-lg object-cover border border-gray-200"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/zero2-lab"
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <Image
                src="/images/footer/linkedin.jpg"
                alt="LinkedIn"
                width={36}
                height={36}
                className="rounded-lg object-cover border border-gray-200"
              />
            </Link>
            <Link
              href="https://www.tiktok.com/@zero2lab?_t=ZS-8u354SClNpN&_r=1"
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <Image
                src="/images/footer/tiktok.jpg"
                alt="TikTok"
                width={36}
                height={36}
                className="rounded-lg object-cover border border-gray-200"
              />
            </Link>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col items-start w-full sm:w-1/2 lg:w-1/4 lg:pl-10">
          <h3 className="mb-5 text-lg font-bold text-[#090D24]">Products</h3>
          <ul className="space-y-3 font-medium text-gray-500">
            <li>
              <Link href={"/courses"} className="hover:text-[#090D24] transition-colors">Courses</Link>
            </li>
            <li>
              <Link href={"/"} className="hover:text-[#090D24] transition-colors">Webinars</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-start w-full sm:w-1/2 lg:w-1/4">
          <h3 className="mb-5 text-lg font-bold text-[#090D24]">Legal</h3>
          <ul className="space-y-3 font-medium text-gray-500">
            <li>
              <Link href={"/privacy-policy"} className="hover:text-[#090D24] transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col items-start w-full sm:w-1/2 lg:w-1/4">
          <h3 className="mb-5 text-lg font-bold text-[#090D24]">Company</h3>
          <ul className="space-y-3 font-medium text-gray-500">
            <li>
              <Link href="/about-us" className="hover:text-[#090D24] transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-[#090D24] transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm font-medium text-center text-gray-500">
          © {new Date().getFullYear()} zero2lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
