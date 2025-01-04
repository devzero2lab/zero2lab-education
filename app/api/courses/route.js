import connectMongoDB from "@/lib/db";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

//create course
export async function POST(request) {
  try {
    const courseData = await request.json();
    await connectMongoDB();
    const newCourse = await Course.create(courseData);
    return NextResponse.json(
      { message: "Course created", newCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//get all courses by type
export async function GET() {
  try {
    await connectMongoDB();
    const courses = await Course.find().sort({ createdAt: -1 });
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
