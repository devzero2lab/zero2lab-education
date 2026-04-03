import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    text: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true }, // TipTap HTML output
    coverImage: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Career Tips", "Tutorials", "News", "Other"],
      default: "Other",
    },
    tags: [{ type: String, trim: true }],
    author: { type: String, required: true, default: "zero2lab Team" },
    published: { type: Boolean, default: false },
    likes: [{ type: String }], // array of Clerk userIds
    comments: [commentSchema],
    readTime: { type: Number, default: 1 }, // in minutes
  },
  { timestamps: true }
);

// Auto-generate readTime from content word count
blogSchema.pre("save", function (next) {
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  next();
});

export const Blog =
  mongoose.models?.Blog || mongoose.model("Blog", blogSchema);
