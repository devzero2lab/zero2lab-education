import connectMongoDB from "@/lib/db";
import { Meeting } from "@/models/meeting";
import { NextResponse } from "next/server";

// Delete a meeting by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { error: "Meeting ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Meeting deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
