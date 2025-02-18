import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Fetch certificate details and populate user and course info
    const certificate = await UserCourse.findById(id)
      .populate("courseId", "courseName")
      .select("courseId firstName lastName");

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ certificate }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
