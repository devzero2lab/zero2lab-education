import connectMongoDB from "@/lib/db";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

//get single course
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


