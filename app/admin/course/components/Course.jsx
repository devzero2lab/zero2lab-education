import Link from "next/link";
import React from "react";

function Course({ courseID, courseImage, courseName, coursePrice }) {
  return (
    <div className="p-4 border rounded shadow-sm">
      <Link href={`/admin/course/${courseID}`}>
        <img
          src={courseImage}
          alt={courseName}
          className="object-cover w-full h-32 rounded"
        />
        <h2 className="mt-2 text-lg font-bold">{courseName}</h2>
        <p className="font-semibold text-blue-500">Rs.{coursePrice}</p>
      </Link>
    </div>
  );
}

export default Course;
