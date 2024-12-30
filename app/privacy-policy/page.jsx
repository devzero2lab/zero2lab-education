import React from "react";
import Head from "next/head";

function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy | Zero2lab Education LMS</title>
        <meta
          name="description"
          content="Zero2lab Education LMS Privacy Policy"
        />
      </Head>
      <div className="min-h-screen px-6 py-12 ">
        <main className="p-8 space-y-12 ">
          <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
          <p className="text-lg text-gray-800">
            At <strong>Zero2</strong>, your privacy is our priority. We are
            committed to protecting your personal data and ensuring transparency
            about how we collect, use, and safe guard your information when you
            use our Learning Management System (LMS) platform.
          </p>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                1. Information We Collect
              </h2>
              <ul className="pl-6 space-y-2 text-lg text-gray-700 list-disc">
                <li>
                  Personal Information: Name, email address, phone number, and
                  educational background.
                </li>
                <li>
                  Account Information: Username, password, and profile
                  preferences.
                </li>
                <li>
                  Payment Information: Billing details for course purchases or
                  subscriptions.
                </li>
                <li>Usage Data: Details about how you use the platform.</li>
                <li>
                  Cookies and Tracking Data: Data to enhance your experience.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                2. How We Use Your Information
              </h2>
              <ul className="pl-6 space-y-2 text-lg text-gray-700 list-disc">
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
              <h2 className="text-2xl font-semibold text-indigo-700">
                3. Data Protection Measures
              </h2>
              <p className="text-lg text-gray-700">
                We take your data is security seriously and implement measures
                like encryption, access control, and regular security reviews to
                ensure your information is safe.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-lg text-gray-700">
                We only share data with trusted third parties, comply with legal
                obligations, or as part of a business transfer. We will never
                sell or rent your personal data.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                5. Your Rights
              </h2>
              <ul className="pl-6 space-y-2 text-lg text-gray-700 list-disc">
                <li>Access: Request a copy of your data.</li>
                <li>
                  Correction: Update inaccurate or incomplete information.
                </li>
                <li>Deletion: Request deletion of your account and data.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                6. Cookies Policy
              </h2>
              <p className="text-lg text-gray-700">
                We use cookies to enhance your browsing experience. You can
                manage your cookie preferences through your browser settings.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-700">
                8. Updates to This Policy
              </h2>
              <p className="text-lg text-gray-700">
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
