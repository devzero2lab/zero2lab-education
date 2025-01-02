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

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  uniqueName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["live", "recorded"],
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate"],
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  content: {
    type: [
      {
        day: {
          type: Number,
          required: true,
        },
        videoUrl: {
          type: String,
          required: true,
        },
        notes: {
          type: String,
          required: false,
        },
      },
    ],
    required: true,
  },
  date: {
    type: String,
    default: getCurrentDate,
  },
  time: {
    type: String,
    default: getCurrentTime,
  },
});

export const Course =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);
