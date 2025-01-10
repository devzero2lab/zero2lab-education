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
      required: true,
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
    paymentSlip: {
      type: String, // URL or file path of the uploaded slip
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
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

const UserCourse = mongoose.model("UserCourse", userCourseSchema);
export default UserCourse;
