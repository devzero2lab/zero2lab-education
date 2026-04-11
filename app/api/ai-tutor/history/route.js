import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { AiChatHistory } from "@/models/aiChatHistory";
import { UserCourse } from "@/models/userCourse";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── GET: Fetch chat history for a specific lesson ────────────────────────────
export async function GET(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const lessonDay = searchParams.get("lessonDay");

    if (!courseId) {
      return NextResponse.json(
        { error: "courseId is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Verify enrollment
    const enrollment = await UserCourse.findOne({
      userId,
      courseId,
      status: { $in: ["Approved", "Completed"] },
    }).select("_id");

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      );
    }

    const query = { userId, courseId };
    if (lessonDay) {
      query.lessonDay = parseInt(lessonDay, 10);
    }

    const history = await AiChatHistory.find(query)
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("lessonDay messages totalCreditsUsed updatedAt");

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
