import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { LessonProgress } from "@/models/lessonProgress";
import { UserCourse } from "@/models/userCourse";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// ─── GET: Fetch student's progress for a course ───────────────────────────────
// Query params: ?userId=...&courseId=...
export async function GET(request) {
  try {
    const { userId: authUserId } = await auth();
    if (!authUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Security: users can only fetch their own progress
    if (userId !== authUserId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectMongoDB();

    // ── Batch mode: no courseId → return all progress records for the user ──
    // Used by the dashboard to replace N individual per-course requests with one.
    if (!courseId) {
      const allProgress = await LessonProgress.find({ userId }).select("courseId completedLessons");
      const progressMap = {};
      allProgress.forEach((p) => {
        progressMap[p.courseId.toString()] = {
          completedLessons: p.completedLessons,
          completedCount: p.completedLessons.length,
        };
      });
      return NextResponse.json({ progressMap }, { status: 200 });
    }

    // ── Single-course mode ──────────────────────────────────────────────────
    // Fetch course total lessons count and student's progress in parallel
    const [course, progress] = await Promise.all([
      Course.findById(courseId).select("content"),
      LessonProgress.findOne({ userId, courseId }).select("completedLessons"),
    ]);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const totalLessons = course.content?.length || 0;
    const completedLessons = progress?.completedLessons || [];
    const completedCount = completedLessons.length;
    const percentage =
      totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return NextResponse.json(
      { completedLessons, totalLessons, completedCount, percentage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── POST: Mark a lesson as complete ─────────────────────────────────────────
// Body: { userId, courseId, lessonDay }
export async function POST(request) {
  try {
    const { userId: authUserId } = await auth();
    if (!authUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, courseId, lessonDay } = body;

    if (!userId || !courseId || lessonDay === undefined) {
      return NextResponse.json(
        { error: "userId, courseId and lessonDay are required" },
        { status: 400 }
      );
    }

    // ✅ Security: prevent marking lessons on behalf of other users
    if (userId !== authUserId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectMongoDB();

    // ✅ Verify the user is actually enrolled and approved for this course
    const enrollment = await UserCourse.findOne({
      userId,
      courseId,
      status: { $in: ["Approved", "Completed"] },
    }).select("_id");

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled or not approved for this course" },
        { status: 403 }
      );
    }

    // ✅ $addToSet ensures no duplicates — idempotent operation
    const updatedProgress = await LessonProgress.findOneAndUpdate(
      { userId, courseId },
      { $addToSet: { completedLessons: lessonDay } },
      { upsert: true, new: true }
    );

    // Fetch course total to return updated stats
    const course = await Course.findById(courseId).select("content");
    const totalLessons = course?.content?.length || 0;
    const completedCount = updatedProgress.completedLessons.length;
    const percentage =
      totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return NextResponse.json(
      {
        message: "Lesson marked as complete",
        completedLessons: updatedProgress.completedLessons,
        totalLessons,
        completedCount,
        percentage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
