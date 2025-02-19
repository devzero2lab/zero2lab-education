import connectMongoDB from "@/lib/db";
import { Meeting } from "@/models/meeting";
import { NextResponse } from "next/server";

// Create a new meeting
export async function POST(request) {
  try {
    const meetingData = await request.json();

    // Basic validation before passing data to Mongoose
    if (
      !meetingData.email ||
      !meetingData.description ||
      !meetingData.date ||
      !meetingData.time
    ) {
      return NextResponse.json(
        {
          error: "All fields (email, description, date and time) are required",
        },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const newMeeting = await Meeting.create(meetingData);
    return NextResponse.json(
      { message: "Meeting scheduled successfully", newMeeting },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get all meetings
export async function GET() {
  try {
    await connectMongoDB();
    const meetingList = await Meeting.find().sort({ createdAt: -1 });
    return NextResponse.json({ meetingList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
