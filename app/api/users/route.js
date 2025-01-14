import connectMongoDB from "@/lib/db";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Fetch all user IDs that are enrolled in any course
    const enrolledUserIds = await UserCourse.find().distinct("userId");

    // Fetch all users who are not in the enrolled list
    const notEnrolledUsers = await User.find({
      clerkId: { $nin: enrolledUserIds }, // Exclude users with clerkId in enrolledUserIds
    });

    // Create the response
    const response = NextResponse.json({ notEnrolledUsers }, { status: 200 });

    // Set cache-control headers to prevent caching
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error) {
    console.error("Error fetching not enrolled users:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
