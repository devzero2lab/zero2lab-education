import React from "react";

function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🚀 Exciting Courses Coming Soon!</h1>
        <p className="text-lg text-gray-600 mb-6">
          We&apos;re working hard to bring you the best learning experience. Stay tuned for updates and be the first to know when we launch!
        </p>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-500">
        © {new Date().getFullYear()} zero2learn. All rights reserved.
      </footer>
    </div>
  );
}

export default ComingSoonPage;
