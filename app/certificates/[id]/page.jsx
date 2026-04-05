"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaDownload, FaLink, FaCheckCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { QRCodeCanvas } from "qrcode.react";
import Loader from "@/app/components/Loader";
import axios from "axios";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

function CertificatePage({ params }) {
  const [html2pdf, setHtml2pdf] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [copyStatus, setCopyStatus] = useState("idle"); // idle | copied | failed
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
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
        setCopyStatus("copied");
        setTimeout(() => setCopyStatus("idle"), 2000);
      })
      .catch(() => {
        setCopyStatus("failed");
        setTimeout(() => setCopyStatus("idle"), 2000);
      });
  };

  if (loading) {
    return <Loader />;
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
      <div className={`min-h-screen bg-white flex items-center justify-center px-6 ${montserrat.className}`}>
        <div className="text-center p-10 bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] shadow-sm max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-[#D9FFA5] border-2 border-[#090D24] flex items-center justify-center mx-auto mb-5">
            <MdVerified className="w-8 h-8 text-[#090D24]" />
          </div>
          <h2 className="text-xl font-black text-[#090D24] mb-2">Certificate Not Found</h2>
          <p className="text-sm font-medium text-gray-500 leading-relaxed">
            This certificate may have been removed or does not exist.
          </p>
        </div>
      </div>
    );
  }

  const copyLabel =
    copyStatus === "copied" ? "Copied!" : copyStatus === "failed" ? "Failed" : "Copy Link";

  return (
    <div className={`min-h-screen bg-white ${montserrat.className}`}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 pt-28 pb-20">

        {/* ── Page Header ── */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-[#D9FFA5] border border-[#090D24]/20 text-[#090D24] rounded-full mb-5">
            <MdVerified className="w-3.5 h-3.5" />
            Verified Certificate
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#090D24] leading-tight mb-3">
            Certificate of Completion
          </h1>
          <p className="text-base font-medium text-gray-500 leading-relaxed max-w-xl">
            Congratulations,{" "}
            <span className="font-bold text-[#090D24]">
              {certificate.firstName} {certificate.lastName}
            </span>
            ! You have successfully completed{" "}
            <span className="font-bold text-[#090D24]">
              {certificate.courseId?.courseName}
            </span>
            .
          </p>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={downloadCertificate}
            disabled={isDownloading}
            className="flex items-center gap-2.5 bg-[#090D24] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaDownload className={`text-sm ${isDownloading ? "animate-bounce" : ""}`} />
            {isDownloading ? "Generating PDF…" : "Download PDF"}
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2.5 bg-white text-[#090D24] border-2 border-[#090D24] px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#f8ffec] transition-all shadow-sm active:scale-95"
          >
            {copyStatus === "copied" ? (
              <FaCheckCircle className="text-sm text-[#090D24]" />
            ) : (
              <FaLink className="text-sm" />
            )}
            {copyLabel}
          </button>
        </div>

        {/* ── Certificate Preview (Wrapped in scrollable area to protect html2pdf rendering) ── */}
        <div className="w-full flex justify-center mb-8 border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm bg-gray-50">
          <div className="w-full overflow-x-auto p-4 md:p-8 flex justify-center hide-scrollbar">
            {/* The actual element captured by html2pdf - Must have NO borders/shadows/margins */}
            <div
              id="certificate"
              className="relative shrink-0 bg-white"
              style={{ width: "1123px", height: "794px" }}
            >
              {/* Using standard HTML img instead of next/image to prevent html2canvas zooming glitch */}
              <img
                src="https://v8gv75m9qo.ufs.sh/f/NWfsvG3BrCsZhUExsC2LZVgOQ3HxDl8z9njdkT7ARYcXyFmB"
                alt="Certificate Background"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "cover" }}
                crossOrigin="anonymous"
                onLoad={() => setImageLoaded(true)}
              />

              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* QR Code — top left */}
                <div className="absolute top-[20px] left-[30px] p-2 bg-white rounded-lg shadow-sm">
                  <QRCodeCanvas
                    value={`https://www.zero2lab.com/certificates/${params.id}`}
                    size={80}
                  />
                </div>

                {/* Certificate ID — top right */}
                <ProtectedText className="absolute top-[30px] right-[30px] text-[12px] font-bold text-gray-500">
                  Certificate ID: {params.id}
                </ProtectedText>

                {/* Course Name */}
                <ProtectedText className="absolute top-[215px] w-full text-center text-[38px] font-extrabold text-[#090D24]">
                  {certificate.courseId?.courseName}
                </ProtectedText>

                {/* Recipient Name */}
                <ProtectedText
                  className="absolute top-[375px] w-full text-center text-[26px] font-black text-[#090D24] tracking-wide"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  {certificate.firstName} {certificate.lastName}
                </ProtectedText>

                {/* Issue Date */}
                <ProtectedText
                  className="absolute right-[280px] top-[592px] text-[15px] font-bold text-[#090D24]"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  {new Date().toLocaleDateString()}
                </ProtectedText>
              </div>
            </div>
          </div>
        </div>

        {/* ── Meta Details Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Recipient", value: `${certificate.firstName} ${certificate.lastName}` },
            { label: "Course", value: certificate.courseId?.courseName },
            { label: "Status", value: certificate.status ?? "Completed" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white border-2 border-[#090D24] rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                {label}
              </p>
              <p className="text-sm font-bold text-[#090D24] line-clamp-1">{value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CertificatePage;
