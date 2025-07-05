import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p>Welcome to <strong>Zero2Learn</strong>. By using our platform, you agree to the following terms. Please read them carefully.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Platform</h2>
      <ul className="list-disc list-inside">
        <li>Minimum age to use the platform is 13 years.</li>
        <li>You are responsible for your account details.</li>
        <li>Do not share or resell course content.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Course Access</h2>
      <p>Access is valid for the period mentioned during purchase. Sharing account access may result in suspension.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments</h2>
      <p>Payments are processed via secure third-party gateways. We do not store full card details.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Refunds</h2>
      <p>Refer to our <a href="/refund-policy" className="text-blue-600">Refund Policy</a> for details.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
      <p>All content is protected. No reproduction is allowed without permission.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Liability</h2>
      <p>We are not responsible for any indirect damages or losses due to use of our platform.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes</h2>
      <p>Terms may be updated anytime. Continued use means acceptance of changes.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p>Email: <a href="mailto:support@zero2learn.com" className="text-blue-600">info@zero2lab.com</a></p>
    </div>
  );
};

export default TermsAndConditions;
