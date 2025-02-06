import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

// Get a single UserCourse by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const userCourse = await UserCourse.findById(id).select("firstName lastName whatsappNumber")
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