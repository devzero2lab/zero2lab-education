"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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
      toast.success("Payment slip uploaded successfully!");
    } else {
      toast.error("Upload Completed! No files returned.");
    }
  };

  const handleUploadError = (error) => {
    console.error("Upload failed", error);
    toast.error("Failed to upload payment slip.");
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
    <div className={`${montserrat.className} mt-[100px] mb-12 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12 overflow-hidden`}>
      <main className="max-w-6xl mx-auto space-y-8 md:space-y-10 w-full">
        {/* Course Header Section */}
        <div className="mb-6 md:mb-8 text-center md:text-left flex flex-col items-center md:items-start group w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#090D24] leading-tight break-words max-w-full">
            Enroll in{" "}
            <span className="text-gray-600 block sm:inline mt-1 sm:mt-0">
              {course.courseName || "Your Course"}
            </span>
          </h1>
          <div className="h-[3px] w-16 bg-[#D9FFA5] rounded-full mt-4 transition-all duration-300 group-hover:w-24"></div>
        </div>

        {/* Top Section: Details & Payment Methods */}
        <section className="grid gap-6 md:gap-8 lg:grid-cols-2 w-full">
          {/* Bank Details Card */}
          <div className="p-4 sm:p-8 bg-[#f8ffec] border-2 border-[#D9FFA5] rounded-3xl shadow-sm transition-shadow hover:shadow-md w-full">
            <h2 className="flex items-center text-xl sm:text-2xl font-bold text-[#090D24] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#D9FFA5]/50">
              <span className="p-2 sm:p-3 bg-[#D9FFA5] border-2 border-[#090D24] rounded-xl sm:rounded-[1rem] mr-3 sm:mr-4 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#090D24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </span>
              Bank Details
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm gap-1 sm:gap-0 w-full overflow-hidden">
                <span className="font-semibold text-gray-500 text-sm sm:text-base">Account Name</span>
                <span className="font-bold text-[#090D24] text-sm sm:text-lg break-words">T.D Jayadeera</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm gap-1 sm:gap-0 w-full overflow-hidden">
                <span className="font-semibold text-gray-500 text-sm sm:text-base">Account Number</span>
                <span className="font-bold text-[#090D24] text-sm sm:text-lg tracking-wide break-words">89714441</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm gap-1 sm:gap-0 w-full overflow-hidden">
                <span className="font-semibold text-gray-500 text-sm sm:text-base">Bank Name</span>
                <span className="font-bold text-[#090D24] text-sm sm:text-lg break-words">BOC - Dikwella</span>
              </div>
            </div>
          </div>

          {/* Course Details Card */}
          <div className="p-4 sm:p-8 bg-white border-2 border-gray-100 rounded-3xl shadow-sm transition-shadow hover:shadow-md w-full">
            <h2 className="flex items-center text-xl sm:text-2xl font-bold text-[#090D24] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
              <span className="p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-[1rem] mr-3 sm:mr-4 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#090D24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              Course Overview
            </h2>

            {loading ? (
              <div className="flex justify-center py-6">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#090D24] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100 gap-1 sm:gap-0 w-full overflow-hidden">
                  <span className="font-semibold text-gray-500 text-sm sm:text-base">Price</span>
                  <div className="w-full sm:w-auto text-left sm:text-right mt-1 sm:mt-0">
                    {course.discountPrice > 0 ? (
                      <div className="flex items-center sm:justify-end gap-2 sm:gap-3 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-gray-400 line-through">
                          Rs.{course.price}
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-[#090D24] bg-[#D9FFA5] px-2 sm:px-3 py-1 rounded-lg">
                          Rs.{course.discountPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg sm:text-xl font-bold text-[#090D24]">
                        Rs.{course.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100 gap-1 sm:gap-0 w-full overflow-hidden">
                  <span className="font-semibold text-gray-500 text-sm sm:text-base">Duration</span>
                  <span className="font-bold text-[#090D24] text-sm sm:text-lg break-words">{course.duration}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100 gap-1 sm:gap-0 w-full overflow-hidden">
                  <span className="font-semibold text-gray-500 text-sm sm:text-base">Difficulty Level</span>
                  <span className="font-bold text-[#090D24] text-sm sm:text-lg capitalize break-words">{course.level}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Section: Upload & Form */}
        <section className="grid gap-6 md:gap-8 lg:grid-cols-2 w-full">
          {/* Upload Section */}
          <div className="p-4 sm:p-8 bg-white border-2 border-gray-100 rounded-3xl shadow-sm flex flex-col transition-shadow hover:shadow-md w-full">
            <h3 className="flex items-center text-lg sm:text-2xl font-bold text-[#090D24] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
              <span className="p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-[1rem] mr-3 sm:mr-4 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#090D24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </span>
              Payment Slip Focus
            </h3>

            <div className="flex-1 flex flex-col justify-center items-center p-3 sm:p-6 border-2 border-gray-200 border-dashed rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors w-full overflow-hidden">
              {uploadedImageUrl ? (
                <div className="w-full text-center flex flex-col items-center">
                  <span className="inline-block mb-4 px-3 sm:px-4 py-1.5 bg-[#D9FFA5] text-[#090D24] text-xs sm:text-sm font-semibold rounded-full border border-[#090D24]/20 shadow-sm break-words">
                    Success! Slip Uploaded
                  </span>
                  <div className="overflow-hidden border border-gray-200 rounded-xl bg-white w-full max-w-[200px] sm:max-w-sm">
                    <Image
                      src={uploadedImageUrl}
                      alt="Payment Slip Preview"
                      width={400}
                      height={200}
                      className="object-contain w-full h-32 sm:h-56"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[280px] sm:max-w-sm mx-auto flex flex-col items-center">
                  <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-200 w-full relative aspect-video bg-white">
                    <Image
                      src="/images/payment/payment.jpg"
                      alt="Payment Guide"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className="w-full overflow-hidden">
                    <UploadButton
                      className="w-full ut-button:w-full ut-button:bg-[#090D24] ut-button:ut-readying:bg-[#090D24]/80 ut-button:hover:bg-gray-800 ut-button:text-white ut-button:font-semibold ut-button:rounded-xl ut-button:py-3 sm:ut-button:py-5 ut-button:text-xs sm:ut-button:text-base ut-button:transition-all ut-allowed-content:hidden ut-button:min-w-0"
                      endpoint="imageUploader"
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                    />
                  </div>
                  <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium text-center break-words">
                    JPG, PNG, JPEG (Max 4MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Details Form */}
          <form
            onSubmit={handlePayment}
            className="p-4 sm:p-8 bg-white border-2 border-gray-100 rounded-3xl shadow-sm flex flex-col transition-shadow hover:shadow-md w-full"
          >
            <h3 className="flex items-center text-lg sm:text-2xl font-bold text-[#090D24] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
              <span className="p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-[1rem] mr-3 sm:mr-4 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#090D24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              User Details
            </h3>

            <div className="space-y-4 sm:space-y-5 flex-1 flex flex-col w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-600 outline-none truncate"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-600 outline-none truncate"
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-600 outline-none truncate"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1.5 mb-4 sm:mb-8 w-full">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#090D24]/20 focus:border-[#090D24] transition-all"
                  placeholder="e.g. 0712345678"
                />
                <p className="mt-1 text-[10px] sm:text-xs text-gray-500 break-words">
                  Include country code if not Sri Lanka (10 digits minimum)
                </p>
              </div>

              <div className="mt-auto pt-3 sm:pt-6 w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-6 flex items-center justify-center gap-2 bg-[#090D24] hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-lg shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Complete Enrollment"
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
