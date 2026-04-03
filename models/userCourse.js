import mongoose from "mongoose";

// Function to get the current date in the desired format
function getCurrentDate() {
  const currentDate = new Date();
  return (
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear()
  );
}
// Function to get the current time in the desired format
function getCurrentTime() {
  const currentDate = new Date();
  return (
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds()
  );
}

const userCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Clerk user ID
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    promoCode: {
      type: String,
      required: false,
    },
    finalPrice: {
      type: Number,
      required: false,
    },
    paymentSlip: {
      type: String, // URL or file path of the uploaded slip
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected" , "Completed"],
      default: "Pending",
    },
    date: {
      type: String,
      default: getCurrentDate,
    },
    time: {
      type: String,
      default: getCurrentTime,
    },
  },
  { timestamps: true }
);

// ✅ Indexes — O(n) full scan → O(log n) indexed lookup
// Compound unique index: speeds up enrollment check + prevents duplicates
userCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });
// Status index: speeds up count aggregation queries
userCourseSchema.index({ userId: 1, status: 1 });

export const UserCourse = mongoose.models?.UserCourse || mongoose.model("UserCourse", userCourseSchema);

