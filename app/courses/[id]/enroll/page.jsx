"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

export default function Checkout({ params }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsappNumber: "",
    userId: "",
    courseId: params?.id || "",
  });
  const [slipImages, setSlipImages] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        userId: user?.id || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const fetchCourseName = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/courses/${formData.courseId}`
        );
        setLoading(false);
        setCourse(response.data.course);
      } catch (error) {
        setLoading(false);
        setCourse("Unknown Course");
      }
    };

    if (formData.courseId) {
      fetchCourseName();
    }
  }, [formData.courseId, apiUrl]);

  const handleUploadComplete = (res) => {
    if (res && res.length > 0) {
      const uploadedFileUrl = res[0]?.url;
      setSlipImages((prev) => [...prev, { image: uploadedFileUrl }]);
      setUploadedImageUrl(uploadedFileUrl);
    } else {
      alert("Upload Completed! No files returned.");
    }
  };

  const handleUploadError = (error) => {
    console.error("Upload failed", error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const whatsappNumberRegex = /^\d{10}$/;

    if (
      !formData.firstName.trim() ||
      !formData.email.trim() ||
      !formData.whatsappNumber.trim() ||
      slipImages.length === 0
    ) {
      toast.error("Please fill in all fields and upload a payment slip.");
      return;
    }

    if (!whatsappNumberRegex.test(formData.whatsappNumber.trim())) {
      toast.error("WhatsApp number must contain exactly 10 digits.");
      return;
    }

    const paymentSlipUrl = slipImages[slipImages.length - 1]?.image || "";
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/usercourses/`, {
        ...formData,
        paymentSlip: paymentSlipUrl,
      });

      if (response.data.message === "You are already enrolled in this course") {
        toast.error(response.data.message);
      } else {
        toast.success("Enrollment successful!");
        router.push("/dashboard");
        setFormData((prevFormData) => ({
          ...prevFormData,
          whatsappNumber: "",
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-12 mt-10 bg-gradient-to-br from-gray-50 to-blue-50 sm:px-6 lg:px-8">
      <main className="max-w-6xl mx-auto space-y-12">
        {/* Course Header Section */}
        <section className="p-6 transition-all transform bg-white shadow-xl rounded-2xl md:p-8 hover:shadow-2xl">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 sm:text-4xl">
            Enroll in{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              {course.courseName || "Your Course"}
            </span>
          </h1>

          {/* Payment Details Card */}
          <div className="p-4 rounded-xl md:p-6">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {/* Bank Details */}
              <div className="space-y-4">
                <h2 className="flex items-center text-xl font-semibold text-gray-800 md:text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Bank Transfer Details
                </h2>
                <div className="space-y-3">
                  <div className="flex flex-col items-start justify-between p-3 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
                    <span className="mb-1 font-medium text-gray-700 sm:mb-0">
                      Account Name:
                    </span>
                    <span className="text-sm text-gray-600 sm:text-base">
                      T.D Jayadeera
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between p-3 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
                    <span className="mb-1 font-medium text-gray-700 sm:mb-0">
                      Account Number:
                    </span>
                    <span className="text-sm text-gray-600 sm:text-base">
                      89714441
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between p-3 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
                    <span className="mb-1 font-medium text-gray-700 sm:mb-0">
                      Bank Name:
                    </span>
                    <span className="text-sm text-gray-600 sm:text-base">
                      BOC - Dikwella
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <h2 className="flex items-center text-xl font-semibold text-gray-800 md:text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Course Overview
                </h2>

                {loading ? (
                  <div className="text-center">
                    <p className="text-sm sm:text-base">Loading...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex flex-col items-start justify-between p-3 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
                      <span className="mb-1 font-medium text-gray-700 sm:mb-0">
                        Price:
                      </span>
                      <div className="text-right">
                        {course.discountPrice > 0 ? (
                          <>
                            <span className="text-xl font-bold text-green-600 sm:text-2xl">
                              Rs.{course.discountPrice}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through sm:text-base">
                              Rs.{course.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-semibold text-blue-600 sm:text-xl">
                            Rs.{course.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-between p-3 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
                      <span className="mb-1 font-medium text-gray-700 sm:mb-0">
                        Duration:
                      </span>
                      <span className="text-sm text-gray-600 sm:text-base">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex flex-col items-start justify-between p-3 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
                      <span className="mb-1 font-medium text-gray-700 sm:mb-0">
                        Level:
                      </span>
                      <span className="text-sm text-gray-600 sm:text-base">
                        {course.level}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className="grid gap-6 lg:grid-cols-2 md:gap-8">
          {/* Upload Section */}
          <div className="p-4 bg-white shadow-xl rounded-2xl md:p-6">
            <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 md:text-2xl md:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload Payment Slip
            </h3>

            <div className="p-4 mb-4 text-center border-2 border-gray-200 border-dashed rounded-xl md:p-6 md:mb-6">
              <div className="max-w-xs mx-auto mb-4 md:mb-6">
                <Image
                  src="/images/payment/payment.jpg"
                  alt="Payment Instructions"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg shadow-md"
                  layout="responsive"
                />
              </div>
              <UploadButton
                className="w-full"
                appearance={{
                  button:
                    "w-full py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-sm md:text-base",
                  allowedContent: "text-gray-500 text-xs md:text-sm",
                }}
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              <p className="mt-3 text-xs text-gray-500 md:mt-4 md:text-sm">
                Supported formats: PNG, JPG, JPEG (Max 4MB)
              </p>
            </div>

            {uploadedImageUrl && (
              <div className="mt-4 md:mt-6">
                <h4 className="mb-2 text-base font-medium text-gray-800 md:text-lg md:mb-3">
                  Uploaded Slip Preview:
                </h4>
                <div className="overflow-hidden border-2 border-gray-200 rounded-lg">
                  <img
                    src={uploadedImageUrl}
                    alt="Payment Slip Preview"
                    className="object-contain w-full h-48 sm:h-64 bg-gray-50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* User Details Form */}
          <form
            onSubmit={handlePayment}
            className="p-4 bg-white shadow-xl rounded-2xl md:p-6"
          >
            <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 md:text-2xl md:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Student Information
            </h3>

            <div className="space-y-4 md:space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 md:text-base md:mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg md:px-4 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 md:text-base"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 md:text-base md:mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg md:px-4 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 md:text-base"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 md:text-base md:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg md:px-4 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 md:text-base"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 md:text-base md:mb-2">
                  WhatsApp Number
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg md:px-4 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:text-base"
                  placeholder="10-digit WhatsApp number"
                />
                <p className="mt-1 text-xs text-gray-500 md:mt-2 md:text-sm">
                  Include country code if not Sri Lanka
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 md:py-4 px-4 md:px-6 text-sm md:text-lg font-semibold text-white rounded-lg transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-xs md:text-sm">
                      Processing Enrollment...
                    </span>
                  </span>
                ) : (
                  "Complete Enrollment"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
