import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Meeting =
  mongoose.models?.Meeting || mongoose.model("Meeting", meetingSchema);
