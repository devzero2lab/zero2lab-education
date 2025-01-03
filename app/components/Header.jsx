"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 z-40 flex items-center justify-between w-full px-4 bg-white shadow-sm h-14 md:px-16 lg:px-32">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-black lg:text-2xl">
        Zero2Lab Education
      </Link>

      {/* Desktop Links */}
      <div className="items-center hidden space-x-4 md:flex lg:space-x-6">
        <Link href="/" className="text-black hover:text-blue-600">
          Home
        </Link>
        <Link href="/courses/live" className="text-black hover:text-blue-600">
          Live
        </Link>
        <Link href="/courses/recorded" className="text-black hover:text-blue-600">
          Recorded
        </Link>
        <Link href="/dashboard" className="text-black hover:text-blue-600">
          Dashboard
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Menu size={28} className="text-black" />
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
          className="text-xl text-black hover:text-blue-600"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          href="/courses/live"
          className="text-xl text-black hover:text-blue-600"
          onClick={toggleMenu}
        >
          Live
        </Link>
        <Link
          href="/courses/recorded"
          className="text-xl text-black hover:text-blue-600"
          onClick={toggleMenu}
        >
          Recorded
        </Link>
        <Link
          href="/dashboard"
          className="text-xl text-black hover:text-blue-600"
          onClick={toggleMenu}
        >
          Dashboard
        </Link>

        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 focus:outline-none"
        >
          <X size={28} className="text-black" />
        </button>
      </div>
    </nav>
  );
}

export default Header;
