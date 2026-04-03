import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import { Blog } from "@/models/blog";

// GET /api/blogs — list published blogs (with pagination)
export async function GET(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const all = searchParams.get("all") === "true"; // admin: get all including drafts

    const query = {};
    if (!all) query.published = true;
    if (category && category !== "all") query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .select("-content -comments") // exclude heavy fields for listing
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST /api/blogs — create a blog (admin only)
export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();

    const { title, slug, excerpt, content, coverImage, category, tags, author, published } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || "",
      category: category || "Other",
      tags: tags || [],
      author: author || "zero2lab Team",
      published: published || false,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Slug already exists. Use a different title." }, { status: 409 });
    }
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
