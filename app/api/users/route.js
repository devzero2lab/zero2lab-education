import connectMongoDB from "@/lib/db";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Check if User collection exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        users: [],
        message: "No users found in the database",
      });
    }

    const usersNotEnrolled = await User.aggregate([
      {
        $lookup: {
          from: "usercourses",
          let: { userClerkId: "$clerkId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$userId", "$$userClerkId"],
                },
              },
            },
          ],
          as: "enrollments",
        },
      },
      {
        $match: {
          enrollments: { $size: 0 },
        },
      },
      {
        $project: {
          _id: 1,
          clerkId: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          createdAt: 1,
        },
      },
      {
        // Sort by creation date (newest first)
        $sort: { createdAt: -1 },
      },
    ]);

    return NextResponse.json({ users: usersNotEnrolled });
  } catch (error) {
    console.error("Error fetching non-enrolled users:", error);

    // Handle specific MongoDB errors
    if (error.name === "MongoServerError") {
      return NextResponse.json(
        {
          success: false,
          error: "Database error",
          message: "Failed to query the database",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
