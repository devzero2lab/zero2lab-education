import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

// Get a single UserCourse by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const userCourse = await UserCourse.findById(id).populate("courseId");
    if (!userCourse) {
      return NextResponse.json(
        { error: "UserCourse not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ userCourse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a UserCourse by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updatedData = await request.json();
    await connectMongoDB();
    const updatedUserCourse = await UserCourse.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    ).populate("courseId");
    if (!updatedUserCourse) {
      return NextResponse.json(
        { error: "UserCourse not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "UserCourse updated", updatedUserCourse },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a UserCourse by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const deletedUserCourse = await UserCourse.findByIdAndDelete(id);
    if (!deletedUserCourse) {
      return NextResponse.json(
        { error: "UserCourse not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "UserCourse deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

