import React from "react";
import Hero from "./components/home/Hero";
import AvuruduDecor from "./components/home/AvuruduDecor";
import StruggleBanner from "./components/home/StruggleBanner";
import Features from "./components/home/Features";
import Reviews from "./components/home/Reviews";
import Link from "next/link";
import FAQSection from "./components/home/FAQSection";
import PromoBanner from "./components/home/PromoBanner";
import HomeBackground from "./components/home/HomeBackground";

function Home() {
  return (
    <HomeBackground>
      <div className="pt-4">
        {/* Avurudu Decor Component */}
        <AvuruduDecor />

        {/* Hero Section */}
        <Hero />

        {/* Struggle Banner */}
        <StruggleBanner />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Popular Courses */}
        <Features />

        {/* Reviews Section */}
        <Reviews />

        {/* FAQ Section */}
        <FAQSection />

        {/* WhatsApp Floating Button */}
        <Link
          href="https://wa.me/message/F5NEXMTYXSFYL1"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#128C7E] pl-4 pr-5 py-3 rounded-full shadow-lg shadow-emerald-900/20 hover:bg-[#0e7a6d] hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-300 group"
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white shrink-0"
          >
            <path
              fill="currentColor"
              d="M19.077 4.928C17.191 3.041 14.683 2.001 12.011 2c-5.506 0-9.987 4.479-9.989 9.985-.001 1.76.459 3.478 1.333 4.992L2 22l5.233-1.237c1.459.812 3.115 1.235 4.778 1.234h.001c5.505 0 9.986-4.48 9.989-9.985.001-2.677-1.042-5.182-2.924-7.084zm-7.066 14.31h-.002c-1.37 0-2.697-.368-3.868-1.067l-.276-.164-2.879.761.769-2.802-.18-.279a8.321 8.321 0 0 1-1.285-4.426c.002-4.625 3.772-8.398 8.407-8.398 2.25 0 4.368.877 5.958 2.467a8.362 8.362 0 0 1 2.467 5.958c-.003 4.632-3.775 8.398-8.401 8.398zm4.65-6.239c-.246-.123-1.456-.719-1.682-.801-.226-.084-.392-.124-.557.123-.166.247-.643.8-.788.967-.145.166-.29.187-.538.062-.247-.123-1.045-.385-1.988-1.232-.734-.654-1.231-1.462-1.375-1.709-.144-.247-.015-.381.109-.504.112-.112.247-.289.371-.434.124-.144.165-.247.247-.412.083-.164.041-.309-.02-.434-.061-.124-.557-1.344-.763-1.841-.204-.497-.409-.429-.557-.433-.147-.004-.315-.004-.483-.004-.168 0-.441.063-.673.309-.232.247-.893.872-.893 2.126 0 1.254.915 2.465 1.043 2.632.128.166 1.8 2.74 4.373 3.851.597.258 1.064.413 1.427.528.577.184 1.103.158 1.519.096.457-.068 1.456-.595 1.66-1.168.205-.574.205-1.066.143-1.168-.061-.101-.225-.164-.472-.287z"
            />
          </svg>

          {/* Text - hidden on very small screens */}
          <span className="hidden sm:inline text-sm font-semibold text-white">
            Chat with us
          </span>
        </Link>
      </div>
    </HomeBackground>
  );
}

export default Home;
