import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import { Blog } from "@/models/blog";
import { auth } from "@clerk/nextjs/server";

// POST /api/blogs/[id]/like — toggle like
export async function POST(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const { id } = params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const alreadyLiked = blog.likes.includes(userId);
    if (alreadyLiked) {
      blog.likes = blog.likes.filter((uid) => uid !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return NextResponse.json({
      liked: !alreadyLiked,
      likesCount: blog.likes.length,
    });
  } catch (error) {
    console.error("POST /api/blogs/[id]/like error:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
