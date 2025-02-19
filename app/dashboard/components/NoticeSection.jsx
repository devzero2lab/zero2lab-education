import React from "react";
import { Clock, Calendar, AlertCircle, Info } from "lucide-react";

function NoticeSection() {
  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Info className="text-blue-600" size={24} />
        <h2 className="text-2xl font-semibold text-gray-800">
          Meeting Guidelines
        </h2>
      </div>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-start gap-3">
            <Clock className="mt-1 text-blue-600" size={20} />
            <div>
              <h3 className="mb-1 font-medium text-gray-800">
                Duration Policy
              </h3>
              <p className="text-gray-600">
                All meetings are strictly limited to 30 minutes to ensure
                efficiency and availability for all students.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-start gap-3">
            <Calendar className="mt-1 text-purple-600" size={20} />
            <div>
              <h3 className="mb-1 font-medium text-gray-800">
                Scheduling Hours
              </h3>
              <p className="text-gray-600">
                Please schedule your meetings after 9:00 PM. This helps
                accommodate various schedules and ensures availability.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 text-orange-600" size={20} />
            <div>
              <h3 className="mb-1 font-medium text-gray-800">Monthly Limit</h3>
              <p className="text-gray-600">
                Students are allowed to book two meeting per month to ensure
                fair access for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-6 border border-blue-100 rounded-lg bg-blue-50">
        <p className="text-sm leading-relaxed text-gray-600">
          Please make sure to provide clear details about your meeting agenda in
          the description. This helps us prepare and make the most of our time
          together.
        </p>
      </div>
    </div>
  );
}

export default NoticeSection;
