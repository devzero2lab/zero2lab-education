import connectMongoDB from "@/lib/db";
import { User } from "@/models/user";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const usersWithoutCourses = await User.find({
      clerkId: { $nin: await UserCourse.distinct("userId") },
    });

    return NextResponse.json(usersWithoutCourses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
