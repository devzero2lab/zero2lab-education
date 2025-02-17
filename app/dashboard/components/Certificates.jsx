"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { FaCertificate } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Certificates() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [allCertificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const Certificates = await axios.get(
          `${apiUrl}/api/Certificates/${userID}`
        );
        setCertificates(Certificates.data);
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

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

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
            <p className="text-center text-gray-500">Loading...</p>
          ) : allCertificates.length > 0 ? (
            <ul className="space-y-4">
              {allCertificates.map((certificate) => (
                <Link
                  href={`/certificates/${certificate._id}`}
                  key={certificate._id}
                >
                  <li className="p-4 mb-3 border rounded-lg shadow">
                    <h3 className="text-lg font-medium">
                      {certificate.courseId.courseName}
                    </h3>
                    <p className="text-gray-500">
                      Status: {certificate.status}
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
