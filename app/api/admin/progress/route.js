import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { LessonProgress } from "@/models/lessonProgress";
import { UserCourse } from "@/models/userCourse";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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

    // Step 1: Get enrollments — only populate courseName (not content array)
    const enrollments = await UserCourse.find(matchFilter)
      .populate("courseId", "courseName")
      .select("userId firstName lastName email courseId status")
      .lean();

    if (enrollments.length === 0) {
      return NextResponse.json({ students: [] }, { status: 200 });
    }

    // Collect unique userId and courseId sets for targeted queries
    const uniqueUserIds = [...new Set(enrollments.map((e) => e.userId))];
    const uniqueCourseIds = [
      ...new Set(enrollments.map((e) => e.courseId?._id?.toString()).filter(Boolean)),
    ];

    // Step 2: Fetch progress docs and course lesson counts IN PARALLEL.
    // - LessonProgress uses $in on indexed (userId, courseId) fields — replaces $or:[N pairs]
    // - Course aggregate computes totalLessons server-side; sends one number per course
    //   instead of loading the entire content array over the network
    const [progressDocs, courseSummaries] = await Promise.all([
      LessonProgress.find({
        userId: { $in: uniqueUserIds },
        courseId: { $in: uniqueCourseIds },
      })
        .select("userId courseId completedLessons")
        .lean(),

      // Only load content._id (one ObjectId per lesson) — avoids sending full
      // videoUrl/notes fields just to get a lesson count. Mongoose auto-casts
      // uniqueCourseIds (strings) to ObjectId in find().
      Course.find({ _id: { $in: uniqueCourseIds } })
        .select("content._id")
        .lean(),
    ]);

    // Build lookup maps
    const progressMap = {};
    progressDocs.forEach((doc) => {
      progressMap[`${doc.userId}_${doc.courseId}`] = doc.completedLessons || [];
    });

    const lessonCountMap = {};
    courseSummaries.forEach((c) => {
      lessonCountMap[c._id.toString()] = c.content?.length || 0;
    });

    // Step 3: Group enrollments by student
    const studentMap = {};
    enrollments.forEach((enrollment) => {
      const { userId, firstName, lastName, email, courseId, status } = enrollment;
      if (!studentMap[userId]) {
        studentMap[userId] = { userId, firstName, lastName, email, courses: [] };
      }

      const totalLessons = lessonCountMap[courseId?._id?.toString()] || 0;
      const key = `${userId}_${courseId?._id}`;
      const completedLessons = progressMap[key] || [];
      const completedCount = completedLessons.length;
      const percentage =
        totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

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
