import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { User } from "@/models/user";
import { AiChatHistory } from "@/models/aiChatHistory";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── GET: List all users with their AI credit balances ────────────────────────
export async function GET(request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId || sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    const users = await User.find({})
      .select("clerkId email firstName lastName aiCredits")
      .sort({ aiCredits: -1 });

    // Get usage stats per user
    const usageStats = await AiChatHistory.aggregate([
      {
        $group: {
          _id: "$userId",
          totalUsed: { $sum: "$totalCreditsUsed" },
          conversationCount: { $sum: 1 },
        },
      },
    ]);

    const usageMap = {};
    usageStats.forEach((s) => {
      usageMap[s._id] = {
        totalUsed: s.totalUsed,
        conversationCount: s.conversationCount,
      };
    });

    const enrichedUsers = users.map((u) => ({
      ...u.toObject(),
      usage: usageMap[u.clerkId] || { totalUsed: 0, conversationCount: 0 },
    }));

    return NextResponse.json({ users: enrichedUsers });
  } catch (error) {
    console.error("Error fetching AI credits:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── PUT: Admin top-up credits for a specific user ────────────────────────────
export async function PUT(request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId || sessionClaims?.metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { clerkId, credits } = await request.json();

    if (!clerkId || credits === undefined || typeof credits !== "number") {
      return NextResponse.json(
        { error: "clerkId and credits (number) are required" },
        { status: 400 }
      );
    }

    if (credits < 0 || credits > 1000) {
      return NextResponse.json(
        { error: "Credits must be between 0 and 1000" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { $inc: { aiCredits: credits } },
      { new: true }
    ).select("clerkId email firstName lastName aiCredits");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: `Successfully added ${credits} credits`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating AI credits:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
