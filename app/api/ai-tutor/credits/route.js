import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { User } from "@/models/user";
import { AiChatHistory } from "@/models/aiChatHistory";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── GET: Fetch credit balance and usage stats ────────────────────────────────
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    const user = await User.findOne({ clerkId: userId }).select("aiCredits firstName lastName");
    if (!user) {
      console.log(`[AI Credits] User not found for clerkId: ${userId}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`[AI Credits] User ${user.firstName} ${user.lastName} — aiCredits: ${user.aiCredits}`);

    // Calculate total credits used across all conversations
    const usageStats = await AiChatHistory.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalUsed: { $sum: "$totalCreditsUsed" },
          conversationCount: { $sum: 1 },
        },
      },
    ]);

    const totalUsed = usageStats[0]?.totalUsed || 0;
    const conversationCount = usageStats[0]?.conversationCount || 0;

    return NextResponse.json({
      credits: user.aiCredits ?? 0,
      totalUsed,
      conversationCount,
    });
  } catch (error) {
    console.error("Error fetching AI credits:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
