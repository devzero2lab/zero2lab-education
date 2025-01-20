import connectMongoDB from "@/lib/db";
import { ContactUs } from "@/models/contactUs";
import { NextResponse } from "next/server";

// Delete feedback by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Validate the ID
    if (!id) {
      return NextResponse.json(
        { error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const deletedFeedback = await ContactUs.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Feedback deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
