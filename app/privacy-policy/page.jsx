import React from "react";
import Head from "next/head";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function PrivacyPolicy() {
  return (
    <div className={montserrat.className}>
      <Head>
        <title>Privacy Policy | Zero2lab Education LMS</title>
        <meta
          name="description"
          content="Zero2lab Education LMS Privacy Policy"
        />
      </Head>
      <div className="mt-[120px] mb-20 w-full max-w-[1300px] mx-auto px-6 md:px-12">
        <main className="p-8 md:p-16 border-2 border-gray-200 rounded-[2rem] bg-white space-y-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#090D24] mb-4">Privacy Policy</h1>
            <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed">
              At <strong className="text-[#090D24]">Zero2</strong>, your privacy is our priority. We are
              committed to protecting your personal data and ensuring transparency
              about how we collect, use, and safe guard your information when you
              use our Learning Management System (LMS) platform.
            </p>
          </div>

          <section className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                1. Information We Collect
              </h2>
              <ul className="pl-6 space-y-3 text-base md:text-lg text-gray-700 list-disc font-medium">
                <li>
                  <strong className="text-[#090D24]">Personal Information:</strong> Name, email address, phone number, and
                  educational background.
                </li>
                <li>
                  <strong className="text-[#090D24]">Account Information:</strong> Username, password, and profile
                  preferences.
                </li>
                <li>
                  <strong className="text-[#090D24]">Payment Information:</strong> Billing details for course purchases or
                  subscriptions.
                </li>
                <li><strong className="text-[#090D24]">Usage Data:</strong> Details about how you use the platform.</li>
                <li>
                  <strong className="text-[#090D24]">Cookies and Tracking Data:</strong> Data to enhance your experience.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                2. How We Use Your Information
              </h2>
              <ul className="pl-6 space-y-3 text-base md:text-lg text-gray-700 list-disc font-medium">
                <li>
                  Providing access to courses and managing your learning
                  experience.
                </li>
                <li>Improving platform functionality and user experience.</li>
                <li>Processing payments and subscriptions.</li>
                <li>Sending updates, newsletters, and marketing materials.</li>
                <li>
                  Ensuring platform security and preventing unauthorized use.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                3. Data Protection Measures
              </h2>
              <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                We take your data is security seriously and implement measures
                like encryption, access control, and regular security reviews to
                ensure your information is safe.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                We only share data with trusted third parties, comply with legal
                obligations, or as part of a business transfer. We will never
                sell or rent your personal data.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                5. Your Rights
              </h2>
              <ul className="pl-6 space-y-3 text-base md:text-lg text-gray-700 list-disc font-medium">
                <li><strong className="text-[#090D24]">Access:</strong> Request a copy of your data.</li>
                <li>
                  <strong className="text-[#090D24]">Correction:</strong> Update inaccurate or incomplete information.
                </li>
                <li><strong className="text-[#090D24]">Deletion:</strong> Request deletion of your account and data.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                6. Cookies Policy
              </h2>
              <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                We use cookies to enhance your browsing experience. You can
                manage your cookie preferences through your browser settings.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#090D24] border-b-2 border-gray-100 pb-2">
                8. Updates to This Policy
              </h2>
              <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                We may update this Privacy Policy periodically. Please review it
                regularly for changes.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
