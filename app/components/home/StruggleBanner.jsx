"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const StruggleBanner = () => {
  const benefits = [
    "Build Apps from Scratch",
    "Help Sessions",
    "Clear Explanations",
    "Access Recordings",
  ];

  return (
    <section className={` px-4 m-0 p-0 md:px-12 w-full ${montserrat.className}`}>
      <div className="container mx-auto max-w-[1300px] relative mt-2 md:mt-4 mb-16 lg:mb-24">
        {/* Banner Container with overflow-hidden */}
        <div className="relative bg-[#D9FFA5] border-2 border-[#090D24] rounded-[1.5rem] md:rounded-[2.5rem] px-4 py-8 md:px-12 md:py-10 flex flex-col items-center justify-center text-center shadow-sm overflow-hidden">
          
          {/* Main Content */}
          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <h2 className="text-xl md:text-3xl lg:text-[2.2rem] font-extrabold text-[#090D24] leading-tight mb-3">
              Still Struggling With Coding? You're Not Alone!
            </h2>
            
            <p className="text-[#090D24] text-sm md:text-base font-medium leading-normal mb-3">
              Every developer has been where you are. Let's turn those challenges into stepping stones for your success
            </p>
            
            <p className="text-[#090D24] text-sm md:text-base font-medium leading-normal mb-6">
              Join us and go from newbie to pro in months.Why you join with us ?
            </p>

            {/* Benefit Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full px-2 md:px-0">
              {benefits.map((text, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] text-[#090D24] font-bold text-sm md:text-base rounded-full py-2.5 px-4 text-center shadow-sm hover:shadow-md transition-all select-none border border-transparent hover:border-gray-200"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Left Image (Struggling Guy) */}
          {/* Hidden on mobile and small tablets, shown on lg and xl */}
          <div className="hidden lg:block absolute left-0 bottom-0 w-[240px] xl:w-[320px] z-0">
            <Image
              src="/images/homepage/banner_left.png"
              alt="Developer struggling with code"
              width={400}
              height={400}
              className="w-full h-auto object-contain object-bottom origin-bottom"
              priority
            />
          </div>

          {/* Right Image (Smiling Girl) */}
          <div className="hidden lg:block absolute right-0 bottom-0 w-[260px] xl:w-[340px] z-0">
            <Image
              src="/images/homepage/banner_right.png"
              alt="Successful confident developer"
              width={400}
              height={400}
              className="w-full h-auto object-contain object-bottom origin-bottom"
              priority
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default StruggleBanner;
