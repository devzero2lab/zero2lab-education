"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false); // rAF throttle flag

  const pathname = usePathname();

  // Hide / show navbar based on scroll direction
  // Throttled via requestAnimationFrame → max 1 update per frame (~60fps)
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return; // skip if a frame is already queued
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;

        // Only call setState when value actually changes (avoids re-renders)
        setIsScrolled((prev) => {
          const next = currentY > 50;
          return prev !== next ? next : prev;
        });

        if (diff > 8 && currentY > 80) {
          setIsHidden((prev) => (prev ? prev : true));
          setIsMenuOpen(false);
        } else if (diff < -6) {
          setIsHidden((prev) => (prev ? false : prev));
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Active link helpers
  const navLink = (href) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return isActive
      ? "relative text-sm font-bold text-gray-900 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:rounded-full after:bg-gray-900 transition-colors"
      : "text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors";
  };

  const mobileNavLink = (href) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return isActive
      ? "text-2xl font-extrabold text-gray-900 border-b-2 border-gray-900 pb-1"
      : "text-2xl font-bold text-gray-400";
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className={`
        fixed left-1/2 -translate-x-1/2 z-50
        flex items-center justify-between
        w-[95%] max-w-7xl px-8 h-16 rounded-[14px]
        transition-all duration-500 ease-in-out
        ${isHidden ? "-translate-y-[110%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
        ${isScrolled
          ? "top-3 bg-white/85 backdrop-blur-md border border-gray-200/60 shadow-md shadow-gray-200/40"
          : "top-6 bg-white border border-gray-400/80 shadow-none"
        }
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/images/homepage/zerolab.png"
          alt="Zero2Lab Logo"
          width={36}
          height={36}
          className="object-contain"
        />
        <span className={`${spaceGrotesk.className} text-[19px] font-bold text-gray-900 tracking-tight leading-none`}>
          zero2lab
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="items-center hidden space-x-8 md:flex">
        <Link href="/" className={navLink("/")}>home</Link>
        <Link href="/courses" className={navLink("/courses")}>course</Link>
        <Link href="/blogs" className={navLink("/blogs")}>blogs</Link>

        <SignedOut>
          <Link href="/sign-in" className={navLink("/sign-in")}>Sign In</Link>
        </SignedOut>

        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-[#121826] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-all shadow-md active:scale-95"
          >
            Dashboard
          </Link>
          <div className="scale-110">
            <UserButton />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Menu size={26} className="text-black" />
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`
          fixed inset-0 h-screen w-full z-50
          flex flex-col items-center justify-center space-y-8
          bg-white/97 backdrop-blur-xl
          transition-all duration-500 md:hidden
          ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
        `}
      >
        <Link href="/" className={mobileNavLink("/")} onClick={toggleMenu}>home</Link>
        <Link href="/courses" className={mobileNavLink("/courses")} onClick={toggleMenu}>course</Link>
        <Link href="/blogs" className={mobileNavLink("/blogs")} onClick={toggleMenu}>blogs</Link>

        <SignedOut>
          <Link href="/sign-in" className={mobileNavLink("/sign-in")} onClick={toggleMenu}>Sign In</Link>
        </SignedOut>

        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-[#121826] text-white px-8 py-3 rounded-2xl text-lg font-bold shadow-lg"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <div className="scale-150 pt-4">
            <UserButton />
          </div>
        </SignedIn>

        <button
          onClick={toggleMenu}
          className="absolute top-8 right-8 p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors"
        >
          <X size={26} />
        </button>
      </div>
    </nav>
  );
}

export default Header;
