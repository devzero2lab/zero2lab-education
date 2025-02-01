"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaLock, FaDownload } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import Loader from '@/app/components/Loader';

function CertificatePage({ params }) {
    const [html2pdf, setHtml2pdf] = React.useState(null);
    const [isDownloading, setIsDownloading] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (imageLoaded) {
            // Add a small delay for better UX
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [imageLoaded]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('html2pdf.js').then((module) => {
                setHtml2pdf(() => module.default);
            });
        }
    }, []);

    const handleContextMenu = (e) => {
        e.preventDefault();
        alert('Content protection enabled - right click disabled');
    };

    const downloadCertificate = () => {
        if (html2pdf) {
            setIsDownloading(true);
            const element = document.getElementById('certificate');

            html2pdf()
                .set({
                    margin: 0,
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: {
                        scale: 1, // Set scale to 1 for accurate positioning
                        useCORS: true,
                        logging: false,
                        letterRendering: true
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: [297, 210], // A4 landscape
                        orientation: 'landscape'
                    }
                })
                .from(element)
                .save(`certificate_${params.id}.pdf`)
                .finally(() => setIsDownloading(false));
        }
    };

    // Reusable Protected Text Component
    const ProtectedText = ({ children, className, style }) => (
        <div
            className={`select-none pointer-events-none ${className}`}
            style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                mixBlendMode: 'multiply',
                ...style
            }}
        >
            {children}
        </div>
    );

    if (loading) {
        return (
            <div className="absolute inset-0 flex justify-center items-center min-h-screen bg-white">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-10 bg-gradient-to-br from-gray-50 to-blue-50 py-12 flex flex-col items-center">
            
            <div className="mb-8 flex gap-4">
                <button
                    onClick={downloadCertificate}
                    disabled={isDownloading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg
          flex items-center gap-2 transition-all transform hover:scale-105
          shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaDownload className="text-lg" />
                    {isDownloading ? 'Generating...' : 'Download Certificate'}
                </button>
            </div>



            {/* Certificate Container */}
            <div
                id="certificate"
                className="relative w-[1123px] h-[794px] bg-white
        shadow-2xl rounded-xl overflow-hidden border-8 border-[#f0f0f0]
        transition-transform duration-300 hover:scale-105"
                onContextMenu={handleContextMenu}
            >
                <div className="absolute inset-0">
                <Image
                        src="https://v8gv75m9qo.ufs.sh/f/NWfsvG3BrCsZLPRUjT6r5DiCXwI2tyPosaQd6Ebeh0YSqnHZ"
                        alt="Certificate Background"
                        layout="fill"
                        className="object-cover select-none"
                        priority
                        draggable={false}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)} // Fallback in case of error
                    />
                </div>

                {/* Certificate Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    {/* Verification QR Code */}
                    <div className="absolute top-[20px] left-[30px] p-2 bg-white rounded-lg shadow-sm">
                        <QRCodeCanvas
                            value={`https://yourwebsite.com/certificate/${params.id}`}
                            size={80}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                        />
                    </div>

                    {/* Certificate ID */}
                    <ProtectedText className="absolute top-[30px] right-[30px] text-xs text-gray-500">
                        Certificate ID: {params.id}
                    </ProtectedText>

                    {/* Main Course Title */}


                    {/* Recipient Name */}
                    <ProtectedText className="absolute top-[220px] text-4xl font-bold text-black">
                        Machine Learning Course
                    </ProtectedText>

                    {/* Course Completion Statement */}
                    <ProtectedText
                        className="absolute top-[390px] text-[18px] font-playfair text-black"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                    >
                        Anupa Isiru Undana
                    </ProtectedText>

                    <ProtectedText
                        className="absolute right-[290px] top-[583px] text-[15px] font-playfair text-black"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                    >
                        2021/20/23
                    </ProtectedText>


                    {/* Security Watermark
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                        <div className="absolute inset-0 bg-[url('/images/watermark.png')] bg-repeat" />
                    </div> */}


                </div>
            </div>
        </div>
    );
}

export default CertificatePage;
