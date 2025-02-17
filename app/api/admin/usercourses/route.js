import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();

    // Extract "status" query parameter
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Validate status (Optional: Ensure it only accepts specific values)
    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Fetch user courses filtered by status
    const userCourses = await UserCourse.find({ status })
      .sort({ createdAt: -1 })
      .populate("courseId", "courseName");

    return NextResponse.json({ userCourses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
