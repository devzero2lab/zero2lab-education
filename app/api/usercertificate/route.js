import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

// Get completed courses for a user
export async function GET(request) {
  try {
    // Extract userId from query params
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Fetch completed courses for the given userId
    const completedCourses = await UserCourse.find({
      userId: userID,
      status: "Completed",
    })
      .populate("courseId", "courseName")
      .select("courseId status");

    return NextResponse.json({ completedCourses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
