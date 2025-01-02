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

export async function GET(req) {
  try {
    await connectMongoDB();

    // Extract the 'type' query parameter from the request
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "Recorded" or "Live"

    let courses;

    if (type) {
      // If type is provided, filter courses by type (Recorded or Live)
      courses = await Course.find({ type });
    } else {
      // If no type is provided, fetch all courses
      courses = await Course.find();
    }

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
