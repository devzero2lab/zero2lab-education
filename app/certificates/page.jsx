"use client";
import React, { useEffect, useState } from "react";
import { FaCertificate } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import axios from "axios";

function Certificates() {
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const certificatesResponse = await axios.get(
          `${apiUrl}/api/usercertificate?userID=${userID}`
        );
        setCertificates(certificatesResponse.data.completedCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, userID, apiUrl]);

  return (
    <div>
      <section className="mb-12 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="flex items-center text-2xl font-semibold">
            <FaCertificate className="mr-3 text-purple-600" />
            Certificates
          </h2>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : certificates.length > 0 ? (
            <ul className="space-y-4">
              {certificates.map((certificate) => (
                <Link
                  href={`/certificates/${certificate._id}`}
                  key={certificate._id}
                >
                  <li className="p-4 mb-3 border rounded-lg shadow">
                    <h3 className="text-lg font-medium">
                      {certificate.courseId.courseName}
                    </h3>
                    <p className="text-gray-500">
                      Course Status : {certificate.status}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No completed certificates available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Certificates;
