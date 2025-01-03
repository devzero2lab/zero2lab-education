"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Checkout({ params }) {
  const userDetails = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    userId: 123,
    courseId: params?.id,
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [formData, setFormData] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    whatsappNumber: "",
    paymentSlip: "test",
    userId: userDetails.userId,
    courseId: userDetails.courseId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/usercourses/`, {
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        courseId: formData.courseId,
        paymentSlip: formData.paymentSlip,
      });

      console.log("Response:", response.data);

      if (response.data.message === "You are already enrolled in this course") {
        alert(response.data.message);
      } else {
        alert("Form submitted successfully!");
      }

      // Reset the form fields after successful submission
      setFormData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        whatsappNumber: "",
        paymentSlip: "test",
        userId: userDetails.userId,
        courseId: userDetails.courseId,
      });
    } catch (error) {
      console.error("Error submitting the form:", error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.message) {
          alert(data.message);
        } else {
          alert("Something Went Wrong");
        }
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 py-12 bg-gray-50">
      <main className="w-full max-w-4xl">
        <section className="p-6 mt-12 bg-white shadow-lg rounded-2xl">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Checkout Here
          </h2>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-700">
              Bank Details
            </h3>
            <ul className="mt-4 text-lg text-gray-600">
              <li>
                <span className="font-bold">Account Name:</span> T.D Jayadeera
              </li>
              <li>
                <span className="font-bold">Account Number:</span> 89714441
              </li>
              <li>
                <span className="font-bold">Bank Name:</span> Boc - Dickwella
              </li>
            </ul>
          </div>
        </section>

        <section className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-2xl font-semibold text-gray-800">
            Payment Details
          </h3>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Full Payment Section */}
            <div className="w-full lg:w-1/2">
              <h4 className="mb-4 text-xl font-semibold text-gray-800">
                Upload Slip
              </h4>
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/images/payment/payment.jpg"
                  alt="PayHere"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="mb-4 text-gray-600">
                Upload Bank Payment Slip Or Screenshot Here
              </div>
              {/* <div className="p-4 text-white border rounded-lg shadow-lg">
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full mt-2 text-sm text-gray-500 transition-all duration-300 ease-in-out file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div> */}
            </div>

            {/* User Details Form */}
            <form
              onSubmit={handlePayment}
              className="w-full space-y-4 lg:w-1/2"
            >
              <h4 className="mb-4 text-xl font-semibold text-gray-800">
                User Details
              </h4>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
