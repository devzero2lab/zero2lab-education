import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
=======

>>>>>>> e8d0a3e22948fb09f2259d565a6c0ed8fe517891
  meetingLink: {
    type: String,
    default: "Not Scheduled Yet", // Default value for meetingLink
  },
  isCompleted: {
    type: Boolean,
    default: false, // Default value for the checkbox
  },
});

export const Schedule =
  mongoose.models?.Schedule || mongoose.model("Schedule", scheduleSchema);
