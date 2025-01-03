import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

// Create a UserCourse
export async function POST(request) {
  try {
    const userCourseData = await request.json();
    await connectMongoDB();
    const newUserCourse = await UserCourse.create(userCourseData);
    return NextResponse.json(
      { message: "UserCourse created", newUserCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all UserCourses or filter by userId
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); // Extract "userId" query parameter
    const action = searchParams.get("action"); // Extract "action" query parameter

    // Connect to MongoDB
    await connectMongoDB();

    if (action === "count") {
      // Return the count of enrolled courses with "Approved" status
      const enrolledCoursesCount = await UserCourse.countDocuments({
        userId,
        status: "Approved",
      });

      return NextResponse.json({ count: enrolledCoursesCount }, { status: 200 });
    }

    // Fetch user courses (default behavior)
    let userCourses;
    if (userId) {
      userCourses = await UserCourse.find({ userId }).populate("courseId");
    } else {
      userCourses = await UserCourse.find().populate("courseId", "courseName");
    }

    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
