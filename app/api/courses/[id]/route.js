import connectMongoDB from "@/lib/db";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

//get single course
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const course = await Course.findById(id).select('courseName price duration level discountPrice');
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//update course
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updatedData = await request.json();
    await connectMongoDB();
    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Course updated", updatedCourse },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//delete course
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
