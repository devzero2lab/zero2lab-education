import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import { Blog } from "@/models/blog";
import { auth } from "@clerk/nextjs/server";

// POST /api/blogs/[id]/comment — add a comment
export async function POST(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const { id } = params;
    const { name, avatarUrl, text } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blog.comments.push({
      userId,
      name: name || "Anonymous",
      avatarUrl: avatarUrl || "",
      text: text.trim(),
    });

    await blog.save();

    const newComment = blog.comments[blog.comments.length - 1];
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("POST /api/blogs/[id]/comment error:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id]/comment?commentId=xxx — delete a comment
export async function DELETE(request, { params }) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json({ error: "commentId is required" }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const isAdmin = sessionClaims?.metadata?.role === "admin";
    if (comment.userId !== userId && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    blog.comments.pull({ _id: commentId });
    await blog.save();

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("DELETE /api/blogs/[id]/comment error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
