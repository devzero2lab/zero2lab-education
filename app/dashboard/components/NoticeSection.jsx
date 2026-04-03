import React from "react";
import { Clock, Calendar, AlertCircle, Info } from "lucide-react";

function NoticeSection() {
  return (
    <div className="h-full p-5 sm:p-6 bg-[#f8ffec] border-2 border-[#D9FFA5] rounded-[2rem] shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4 mb-6">
        <div className="p-2 sm:p-3 bg-[#D9FFA5] border-2 border-[#090D24] rounded-xl shrink-0">
          <Info className="text-[#090D24]" size={20} strokeWidth={2.5} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#090D24]">
          Meeting Guidelines
        </h2>
      </div>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-1.5 bg-blue-50 border border-blue-100 rounded-lg shrink-0 mt-0.5">
              <Clock className="text-blue-600" size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-[#090D24]">
                Duration Policy
              </h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm leading-relaxed">
                All meetings are strictly limited to 30 minutes to ensure
                efficiency and availability for all students.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-1.5 bg-purple-50 border border-purple-100 rounded-lg shrink-0 mt-0.5">
              <Calendar className="text-purple-600" size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-[#090D24]">
                Scheduling Hours
              </h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm leading-relaxed">
                Please schedule your meetings after 9:00 PM. This helps
                accommodate various schedules and ensures availability.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-1.5 bg-orange-50 border border-orange-100 rounded-lg shrink-0 mt-0.5">
              <AlertCircle className="text-orange-600" size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-[#090D24]">Monthly Limit</h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm leading-relaxed">
                Students are allowed to book one meeting per month to ensure
                fair access for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-6 border-2 border-blue-200 rounded-2xl bg-blue-50/50">
        <p className="text-xs sm:text-sm font-semibold leading-relaxed text-blue-900">
          * Please make sure to provide clear details about your meeting agenda in
          the description. This helps us prepare and make the most of our time
          together.
        </p>
      </div>
    </div>
  );
}

export default NoticeSection;
