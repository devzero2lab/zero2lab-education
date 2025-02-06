"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function UpdateApprovedUserCourses({ params }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    whatsappNumber: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/admin/usercourses/${params.id}`
        );
        setFormData(response.data.userCourse);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (params.id) {
      fetchUserDetails();
    }
  }, [params.id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/usercourses/${params.id}`,
        formData
      );
      toast.success("User details updated successfully");
      router.push("/admin/approved");
    } catch (error) {
      toast.error("Failed to update user details. Please try again.");
      console.error("Error updating user course:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Update User Course</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="whatsappNumber"
          placeholder="Whatsapp Number"
          value={formData.whatsappNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdateApprovedUserCourses;
