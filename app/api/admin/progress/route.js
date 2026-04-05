import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { LessonProgress } from "@/models/lessonProgress";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

// Admin-only: Get all students' progress across all courses
// Middleware already ensures only admins reach this route
export async function GET(request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Double-check admin role server-side (defense in depth)
    const role = sessionClaims?.metadata?.role;
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const filterCourseId = searchParams.get("courseId"); // optional filter

    await connectMongoDB();

    // Build match filter
    const matchFilter = { status: { $in: ["Approved", "Completed"] } };
    if (filterCourseId) matchFilter.courseId = filterCourseId;

    // Get all approved/completed enrollments with course + progress data
    const enrollments = await UserCourse.find(matchFilter)
      .populate("courseId", "courseName content")
      .select("userId firstName lastName email courseId status")
      .lean();

    if (enrollments.length === 0) {
      return NextResponse.json({ students: [] }, { status: 200 });
    }

    // Get all relevant progress docs in one query
    const userCourseIds = enrollments.map((e) => ({
      userId: e.userId,
      courseId: e.courseId?._id?.toString(),
    }));

    // Fetch all LessonProgress docs for these user+course combos
    const progressDocs = await LessonProgress.find({
      $or: userCourseIds.map(({ userId, courseId }) => ({ userId, courseId })),
    })
      .select("userId courseId completedLessons")
      .lean();

    // Build a quick lookup map: "userId_courseId" → completedLessons
    const progressMap = {};
    progressDocs.forEach((doc) => {
      const key = `${doc.userId}_${doc.courseId}`;
      progressMap[key] = doc.completedLessons || [];
    });

    // Group enrollments by student (userId)
    const studentMap = {};
    enrollments.forEach((enrollment) => {
      const { userId, firstName, lastName, email, courseId, status } =
        enrollment;
      if (!studentMap[userId]) {
        studentMap[userId] = { userId, firstName, lastName, email, courses: [] };
      }

      const totalLessons = courseId?.content?.length || 0;
      const key = `${userId}_${courseId?._id}`;
      const completedLessons = progressMap[key] || [];
      const completedCount = completedLessons.length;
      const percentage =
        totalLessons > 0
          ? Math.round((completedCount / totalLessons) * 100)
          : 0;

      studentMap[userId].courses.push({
        enrollmentId: enrollment._id,
        courseId: courseId?._id,
        courseName: courseId?.courseName || "Unknown",
        totalLessons,
        completedLessons,
        completedCount,
        percentage,
        status,
      });
    });

    const students = Object.values(studentMap);

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
