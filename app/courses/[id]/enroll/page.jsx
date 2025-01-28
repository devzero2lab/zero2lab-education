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
    <div className="min-h-screen bg-gradient-to-br mt-10 from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-6xl mx-auto space-y-12">
        {/* Course Header Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
            Enroll in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {course.courseName || "Your Course"}
            </span>
          </h1>

          {/* Payment Details Card */}
          <div className=" rounded-xl p-6 ">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bank Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Bank Transfer Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700">Account Name:</span>
                    <span className="text-gray-600">T.D Jayadeera</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700">Account Number:</span>
                    <span className="text-gray-600">89714441</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700">Bank Name:</span>
                    <span className="text-gray-600">BOC - Dikwella</span>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Course Overview
                </h2>

                {loading ? (
                  <div className=" text-center">
                    <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                      <svg class="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                        </path>
                      </svg>
                    </div>
                    loading...
                  </div>
                ) : (
                  <div className="space-y-3">

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-gray-700">Price:</span>
                      <div>
                        {course.discountPrice ? (
                          <>
                            <span className="text-2xl font-bold  text-green-600">
                              Rs.{course.discountPrice}
                            </span>
                            <span className="text-2x line-through  ml-2 text-gray-500">
                              Rs.{course.price}
                            </span></>
                        ) : (
                          <span className="text-blue-600 font-semibold">Rs.{course.price}</span>
                        )
                        }
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-gray-700">Duration:</span>
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-gray-700">Level:</span>
                      <span className="text-gray-600">{course.level}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Payment Slip
            </h3>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mb-6">
              <Image
                src="/images/payment/payment.jpg"
                alt="Payment Instructions"
                width={300}
                height={200}
                className="rounded-lg mx-auto mb-6 shadow-md"
              />
              <UploadButton
                className="w-full"
                appearance={{
                  button: "w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300",
                  allowedContent: "text-gray-500 text-sm"
                }}
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              <p className="mt-4 text-sm text-gray-500">
                Supported formats: PNG, JPG, JPEG (Max 4MB)
              </p>
            </div>

            {uploadedImageUrl && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Uploaded Slip Preview:</h4>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={uploadedImageUrl}
                    alt="Payment Slip Preview"
                    className="w-full h-64 object-contain bg-gray-50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* User Details Form */}
          <form onSubmit={handlePayment} className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Student Information
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 10-digit WhatsApp number"
                />
                <p className="mt-2 text-sm text-gray-500">Include country code if not Sri Lanka</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 text-lg font-semibold text-white rounded-lg transition-all ${isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Enrollment...
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