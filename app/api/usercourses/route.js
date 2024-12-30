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
    // Extract the searchParams from the request URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId"); // Extract "userId" query parameter

    // Connect to MongoDB
    await connectMongoDB();

    let userCourses;

    // If userId is provided, filter UserCourses by userId
    if (userId) {
      userCourses = await UserCourse.find({ userId }).populate("courseId");
    } else {
      // Otherwise, fetch all UserCourses
      userCourses = await UserCourse.find().populate("courseId");
    }

    // Return the fetched userCourses
    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    // In case of error, return a 500 response with the error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
