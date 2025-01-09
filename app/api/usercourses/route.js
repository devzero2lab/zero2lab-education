import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

// Create a UserCourse
export async function POST(request) {
  try {
    const userCourseData = await request.json();
    await connectMongoDB();

    // Check if the user is already enrolled in the course
    const existingEnrollment = await UserCourse.findOne({
      userId: userCourseData.userId,
      courseId: userCourseData.courseId,
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "You are already enrolled in this course" },
        { status: 400 } // Return a 400 status code indicating bad request
      );
    }

    // Create a new UserCourse
    const newUserCourse = await UserCourse.create(userCourseData);
    return NextResponse.json(
      { message: "UserCourse created", newUserCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all UserCourses or filter by userId, status
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); // Extract "userId" query parameter
    const action = searchParams.get("action"); // Extract "action" query parameter
    const status = searchParams.get("status"); // Extract "status" query parameter

    // Connect to MongoDB
    await connectMongoDB();

    if (action === "count") {
      // Return the count of enrolled courses with "Approved" status
      const enrolledCoursesCount = await UserCourse.countDocuments({
        userId,
        status: "Approved",
      });

      return NextResponse.json(
        { count: enrolledCoursesCount },
        { status: 200 }
      );
    }

    // Handle fetching based on status
    let userCourses;
    if (status) {
      // Filter courses by status (Pending or Approved)
      userCourses = await UserCourse.find({ status })
        .sort({ createdAt: -1 })
        .populate("courseId", "courseName");
    } else if (userId) {
      // Filter by userId
      userCourses = await UserCourse.find({ userId }).populate("courseId");
    } else {
      // Fetch all user courses
      userCourses = await UserCourse.find().populate("courseId", "courseName");
    }

    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
