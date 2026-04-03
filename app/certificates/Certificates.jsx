import React from "react";
import { FaCertificate } from "react-icons/fa";
import Link from "next/link";

function Certificates({ certificates, loading }) {
  return (
    <div>
      <section className="mb-10 bg-white border-2 border-gray-100 shadow-sm rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b-2 border-gray-100 bg-gray-50/50">
          <h2 className="flex items-center text-lg sm:text-xl font-bold text-[#090D24]">
            <span className="p-2 bg-[#D9FFA5] border-2 border-[#090D24] rounded-xl mr-3 sm:mr-4 shrink-0">
              <FaCertificate className="w-5 h-5 text-[#090D24]" />
            </span>
            Certificates
          </h2>
        </div>
        <div className="p-5 sm:p-6">
          {loading ? (
            <div className="py-10 flex justify-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#090D24] rounded-full animate-spin"></div>
            </div>
          ) : certificates.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {certificates.map((certificate) => (
                <Link
                  href={`/certificates/${certificate._id}`}
                  key={certificate._id}
                  className="block group"
                >
                  <li className="p-4 transition-all duration-300 border-2 border-gray-100 rounded-2xl hover:border-[#090D24] hover:shadow-[4px_4px_0_0_#D9FFA5] bg-white flex justify-between items-center">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#090D24] line-clamp-1 mb-2">
                        {certificate.courseId.courseName}
                      </h3>
                      <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold text-[#090D24] bg-gray-100 border-2 border-gray-200 rounded-full">
                        Status : {certificate.status}
                      </span>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl group-hover:bg-[#090D24] transition-colors shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="p-4 bg-gray-50 rounded-2xl mb-4 border-2 border-gray-100">
                <FaCertificate className="w-10 h-10 text-[#090D24]/30" />
              </div>
              <h3 className="text-lg font-bold text-[#090D24]">
                No certificates available yet
              </h3>
              <p className="mt-1.5 text-sm text-gray-500 font-medium">
                Complete a course to earn your first certificate!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Certificates;
