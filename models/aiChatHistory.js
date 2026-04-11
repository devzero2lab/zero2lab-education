import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  creditsUsed: {
    type: Number,
    default: 0,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  flagReason: {
    type: String,
    default: null,
  },
});

const aiChatHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Clerk user ID
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lessonDay: {
      type: Number,
      required: true,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
    totalCreditsUsed: {
      type: Number,
      default: 0,
    },
    // Auto-delete after 7 days via MongoDB TTL index
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

// Indexes for fast lookups
aiChatHistorySchema.index({ userId: 1, courseId: 1, lessonDay: 1 });

// TTL index: MongoDB will automatically delete documents when expiresAt is reached
aiChatHistorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AiChatHistory =
  mongoose.models?.AiChatHistory ||
  mongoose.model("AiChatHistory", aiChatHistorySchema);
