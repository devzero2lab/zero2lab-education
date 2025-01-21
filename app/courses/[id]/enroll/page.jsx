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

  // Initialize state hooks at the top level
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

  // Fetch user details once loaded
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

  // Fetch course name based on course ID
  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/courses/${formData.courseId}`
        );
        setCourse(response.data.course);
      } catch (error) {
        setCourse("Unknown Course");
      }
    };

    if (formData.courseId) {
      fetchCourseName();
    }
  }, [formData.courseId, apiUrl]);

  // Handle file upload completion
  const handleUploadComplete = (res) => {
    if (res && res.length > 0) {
      const uploadedFileUrl = res[0]?.url;
      setSlipImages((prev) => [...prev, { image: uploadedFileUrl }]);
      setUploadedImageUrl(uploadedFileUrl); // Store the uploaded image URL for display
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
      !formData.lastName.trim() ||
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 py-12 bg-gray-50">
      <main className="w-full max-w-4xl">
        <section className="p-6 mt-12 shadow-xl bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl">
          <h2 className="text-4xl font-extrabold tracking-wide text-center text-gray-800">
            Checkout For {course.courseName || "Loading..."}
          </h2>
          <div className="p-6 mt-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="pb-2 mb-4 text-2xl font-semibold text-blue-600 border-b-4 border-blue-300">
              Bank Details
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-center">
                <span className="w-48 font-bold text-gray-800">
                  Account Name:
                </span>
                <span className="text-gray-600">T.D Jayadeera</span>
              </li>
              <li className="flex items-center">
                <span className="w-48 font-bold text-gray-800">
                  Account Number:
                </span>
                <span className="text-gray-600">89714441</span>
              </li>
              <li className="flex items-center">
                <span className="w-48 font-bold text-gray-800">Bank Name:</span>
                <span className="text-gray-600">BOC - Dikwella</span>
              </li>
            </ul>
            <div className="p-5 mt-6 transition-shadow duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-100 to-green-200 hover:shadow-lg">
              <h4 className="mb-4 text-xl font-bold text-green-800">
                Course Details
              </h4>
              <p className="mb-2 text-gray-800">
                <span className="font-bold">Course Name:</span>{" "}
                {course.courseName}
              </p>
              <p className="mb-2 text-gray-800">
                <span className="font-bold">Price:</span> Rs.{course.price}
              </p>
              <p className="mb-2 text-gray-800">
                <span className="font-bold">Duration:</span> {course.duration}
              </p>
              <p className="text-gray-800">
                <span className="font-bold">Level:</span> {course.level}
              </p>
            </div>
          </div>
        </section>
        <section className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-2xl font-semibold text-gray-800">
            Payment Details
          </h3>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Full Payment Section */}
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
              <div className="p-4 text-white border rounded-lg shadow-lg">
                <UploadButton
                  className="w-full py-4 font-medium text-white transition-all duration-300 rounded-xl sm:w-auto"
                  appearance={{
                    button: {
                      padding: "1rem 1rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      background: "linear-gradient(to right, #4F46E5, #3B82F6)",
                      color: "#FFFFFF",
                    },
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) =>
                    handleUploadComplete(res, "full")
                  }
                  onUploadError={handleUploadError}
                />
              </div>
              {/* Display Uploaded Image */}
              {uploadedImageUrl && (
                <div className="my-4">
                  <h5 className="text-xl font-semibold text-gray-800">
                    Uploaded Image Preview:
                  </h5>
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded Payment Slip"
                    className="h-auto max-w-full mt-2 rounded-lg shadow-lg"
                  />
                </div>
              )}
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
                  disabled
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
                  disabled
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
                  disabled
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
                className={`w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isLoading
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-blue-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Submit"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
