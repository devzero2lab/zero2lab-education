import Link from "next/link";

export default function NotEnrolledPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4 text-lg text-gray-700">
        You are not enrolled in this course.
      </p>
      <Link
        href="/courses"
        className="px-6 py-3 mt-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
      >
        Browse Courses
      </Link>
    </div>
  );
}
