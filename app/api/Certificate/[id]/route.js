import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

// Get all completed UserCourses for a user
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    // Find all completed courses for the given userId
    const userCourses = await UserCourse.find({_id:id, status: "Completed" })
      .populate("courseId", "courseName") // Populate courseId and select courseName
      .select("courseId status firstName lastName");

    if (!userCourses.length) {
      return NextResponse.json([], { status: 200 }); // Return an empty array if no courses are found
    }

    return NextResponse.json(userCourses, { status: 200 }); // Return the array directly
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
