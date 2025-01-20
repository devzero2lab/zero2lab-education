import connectMongoDB from "@/lib/db";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Find users who are enrolled in courses
    const enrolledUserIds = await UserCourse.distinct("userId");

    // Find users who are NOT enrolled in any courses
    const unenrolledUsers = await User.find({
      clerkId: { $nin: enrolledUserIds },
    });

    return NextResponse.json({ unenrolledUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching unenrolled users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
