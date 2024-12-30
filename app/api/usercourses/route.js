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

// Get all UserCourses
export async function GET() {
  try {
    await connectMongoDB();
    const userCourses = await UserCourse.find().populate("courseId");
    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
