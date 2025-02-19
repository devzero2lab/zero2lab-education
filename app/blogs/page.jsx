import React from "react";
import { Rocket } from "lucide-react";

function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 text-center bg-white rounded-lg">
        <Rocket className="w-16 h-16 mx-auto text-blue-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          Exciting Blogs Coming Soon!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Stay tuned for insightful articles, coding tips, and industry trends.
        </p>
      </div>
    </div>
  );
}

export default Page;
