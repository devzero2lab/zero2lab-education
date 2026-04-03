import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import { Blog } from "@/models/blog";

// GET /api/blogs/[id] — single blog by id or slug
export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    // Try by MongoDB _id first, then by slug
    let blog = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id).lean();
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id }).lean();
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET /api/blogs/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT /api/blogs/[id] — update blog (admin only)
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    const body = await request.json();

    const blog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("PUT /api/blogs/[id] error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — delete blog (admin only)
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blogs/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
