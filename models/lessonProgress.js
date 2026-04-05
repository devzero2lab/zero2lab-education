import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
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
    // Array of lesson day numbers the student has completed
    completedLessons: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

// Compound unique index: one progress doc per student per course
lessonProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const LessonProgress =
  mongoose.models?.LessonProgress ||
  mongoose.model("LessonProgress", lessonProgressSchema);
