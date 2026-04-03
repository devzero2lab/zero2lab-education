"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaDownload, FaLink } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import Loader from "@/app/components/Loader";
import axios from "axios";

function CertificatePage({ params }) {
  const [html2pdf, setHtml2pdf] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy URL");
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Fetch certificate details
    const fetchCertificate = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/usercertificate/${params.id}`
        );
        if (response.data.certificate) {
          setCertificate(response.data.certificate);
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [params.id, apiUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("html2pdf.js").then((module) => {
        setHtml2pdf(() => module.default);
      });
    }
  }, []);

  const downloadCertificate = () => {
    if (html2pdf) {
      setIsDownloading(true);
      const element = document.getElementById("certificate");

      html2pdf()
        .set({
          margin: 0,
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 1, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: [297, 210], orientation: "landscape" },
        })
        .from(element)
        .save(`certificate_${params.id}.pdf`)
        .finally(() => setIsDownloading(false));
    }
  };

  const copyToClipboard = () => {
    const certificateUrl = `https://www.zero2lab.com/certificates/${params.id}`;
    navigator.clipboard
      .writeText(certificateUrl)
      .then(() => {
        setCopyButtonText("Copied!");
        setTimeout(() => setCopyButtonText("Copy URL"), 2000); // Reset button text after 2 seconds
      })
      .catch(() => {
        setCopyButtonText("Failed to Copy");
        setTimeout(() => setCopyButtonText("Copy URL"), 2000); // Reset button text after 2 seconds
      });
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Reusable Protected Text Component
  const ProtectedText = ({ children, className, style }) => (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        mixBlendMode: "multiply",
        ...style,
      }}
    >
      {children}
    </div>
  );

  if (!certificate) {
    return (
      <div className="mt-10 text-center text-red-500">
        Certificate not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-12 mt-10 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mb-8">
        <button
          onClick={downloadCertificate}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-3 text-white transition-all transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaDownload className="text-lg" />
          {isDownloading ? "Generating..." : "Download Certificate"}
        </button>
      </div>

      {/* Copy URL Button */}
      <div className="mb-8">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-6 py-3 text-white transition-all transform bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105"
        >
          <FaLink className="text-lg" />
          {copyButtonText}
        </button>
      </div>

      <div
        id="certificate"
        className="relative w-[1123px] h-[794px] bg-white shadow-2xl rounded-xl overflow-hidden border-8 border-gray-200 transition-transform duration-300 hover:scale-105"
      >
        <div className="absolute inset-0">
          <Image
            src="https://v8gv75m9qo.ufs.sh/f/NWfsvG3BrCsZhUExsC2LZVgOQ3HxDl8z9njdkT7ARYcXyFmB"
            alt="Certificate Background"
            layout="fill"
            className="object-cover"
            priority
            draggable={false}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="absolute top-[20px] left-[30px] p-2 bg-white rounded-lg shadow-sm">
            <QRCodeCanvas
              value={`https://www.zero2lab.com/certificates/${params.id}`}
              size={80}
            />
          </div>

          {/* Certificate ID */}
          <ProtectedText className="absolute top-[30px] right-[30px] text-xs text-gray-500">
            Certificate ID: {params.id}
          </ProtectedText>

          {/* Main Course Title */}

          {/* Recipient Name */}
          <ProtectedText className="absolute top-[220px] text-4xl font-bold text-black">
            {certificate.courseId.courseName}
          </ProtectedText>

          {/* Course Completion Statement */}
          <ProtectedText
            className="absolute top-[390px] text-[18px] font-playfair text-black"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
          >
            {certificate.firstName} {certificate.lastName}
          </ProtectedText>

          <ProtectedText
            className="absolute right-[290px] top-[583px] text-[15px] font-playfair text-black"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
          >
            {new Date().toLocaleDateString()}
          </ProtectedText>
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
