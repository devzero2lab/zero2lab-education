import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const searchQuery = searchParams.get("search"); // Get search query

    // Base query: Only fetch approved records
    let query = { status: status || "Approved" };

    // If a search query exists, modify the query
    if (searchQuery) {
      query.$or = [
        { firstName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search
        { lastName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { whatsappNumber: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Fetch filtered user courses from DB
    const userCourses = await UserCourse.find(query)
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
