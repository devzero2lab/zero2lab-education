import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── GET: Fetch all lesson content for a course ───────────────────────────────
export async function GET(request, { params }) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId || sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    const course = await Course.findById(params.id).select("courseName content");
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      courseName: course.courseName,
      content: course.content.map((item) => ({
        day: item.day,
        videoUrl: item.videoUrl,
        notes: item.notes || "",
      })),
    });
  } catch (error) {
    console.error("Error fetching course content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── PUT: Update notes for a specific lesson day ──────────────────────────────
export async function PUT(request, { params }) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId || sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { day, notes } = await request.json();

    if (!day || typeof day !== "number") {
      return NextResponse.json(
        { error: "Day (number) is required" },
        { status: 400 }
      );
    }

    if (typeof notes !== "string") {
      return NextResponse.json(
        { error: "Notes must be a string" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Atomic update: only update the notes for the matching day
    const result = await Course.findOneAndUpdate(
      { _id: params.id, "content.day": day },
      { $set: { "content.$.notes": notes } },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Course or lesson day not found" },
        { status: 404 }
      );
    }

    const updatedLesson = result.content.find((c) => c.day === day);

    return NextResponse.json({
      message: `Day ${day} content updated successfully`,
      day: updatedLesson.day,
      notes: updatedLesson.notes,
    });
  } catch (error) {
    console.error("Error updating lesson content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
