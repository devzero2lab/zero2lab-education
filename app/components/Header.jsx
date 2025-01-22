"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-4 backdrop-blur-sm bg-[#000000ab] shadow-sm h-14 md:px-16 lg:px-32">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-white lg:text-2xl">
        Zero2learn
      </Link>

      {/* Desktop Links */}
      <div className="items-center hidden space-x-4 md:flex lg:space-x-6">
        <Link href="/" className="text-white hover:text-blue-600">
          Home
        </Link>
        <Link href="/courses" className="text-white hover:text-blue-600">
          Courses
        </Link>
        <SignedOut>
          <Link href="/sign-in" className="text-white hover:text-blue-600">
            Sign In
          </Link>
        </SignedOut>
        {/* sign in links */}
        <SignedIn>
          <UserButton />
          <Link
            href="/dashboard"
            className="bg-[#5e6ef6] text-white px-4 py-2 rounded-lg font-bold"
          >
            Dashboard
          </Link>
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Menu size={28} className="text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center space-y-6 bg-white transition-transform duration-300 md:hidden ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <Link
          href="/"
          className="text-xl text-white hover:text-blue-600"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          href="/courses"
          className="text-xl text-white hover:text-blue-600"
          onClick={toggleMenu}
        >
          Courses
        </Link>
        <SignedOut>
          <Link href="/sign-in" className="text-white hover:text-blue-600">
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Link
            href="/dashboard"
            className="bg-[#5e6ef6] text-white px-4 py-2 rounded-lg font-bold"
          >
            Dashboard
          </Link>
        </SignedIn>

        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 focus:outline-none"
        >
          <X size={28} className="text-white" />
        </button>
      </div>
    </nav>
  );
}

export default Header;
