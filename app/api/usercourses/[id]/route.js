import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { User } from "@/models/user";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

// Get a single UserCourse by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const userCourse = await UserCourse.findById(id).populate("courseId").select('courseName');
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

    // Check current status before update (for credit granting logic)
    const currentUserCourse = await UserCourse.findById(id).select("status userId courseId");
    if (!currentUserCourse) {
      return NextResponse.json(
        { error: "UserCourse not found" },
        { status: 404 }
      );
    }

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

    // ── Grant AI credits when status changes to "Approved" ───────────────
    if (
      updatedData.status === "Approved" &&
      currentUserCourse.status !== "Approved"
    ) {
      const course = await Course.findById(currentUserCourse.courseId).select(
        "aiCreditsGrant"
      );
      const creditsToGrant = course?.aiCreditsGrant || 50;

      await User.findOneAndUpdate(
        { clerkId: currentUserCourse.userId },
        { $inc: { aiCredits: creditsToGrant } }
      );

      console.log(
        `✅ Granted ${creditsToGrant} AI credits to user ${currentUserCourse.userId}`
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

