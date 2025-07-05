import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      <p>Thank you for choosing <strong>Zero2Learn</strong> for your learning journey. We are committed to providing high-quality, structured educational content. If you are not entirely satisfied with your purchase, we are here to help.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Subscription Refunds</h2>
      <p>
        We offer a <strong>7-day refund policy</strong> for new users. Contact us within 7 days if you are not satisfied. Refunds apply only if less than 25% of course content is completed.
      </p>


      <h2 className="text-xl font-semibold mt-6 mb-2">Processing Time</h2>
      <p>Refunds will be processed within 7 business days to your original payment method.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>Email: <a href="mailto:support@zero2learn.com" className="text-blue-600">support@zero2learn.com</a></p>
    </div>
  );
};

export default RefundPolicy;
