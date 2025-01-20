import connectMongoDB from "@/lib/db";
import { ContactUs } from "@/models/contactUs";
import { NextResponse } from "next/server";

//create feedback
export async function POST(request) {
  try {
    const contactusData = await request.json();

    // Basic validation before passing data to Mongoose
    if (!contactusData.name || !contactusData.email || !contactusData.message) {
      return NextResponse.json(
        { error: "All fields (name, email, message) are required" },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const newContact = await ContactUs.create(contactusData);
    return NextResponse.json(
      { message: "Feedback created successfully", newContact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get all feedback
export async function GET() {
  try {
    await connectMongoDB();
    const feedbackList = await ContactUs.find().sort({ createdAt: -1 });
    return NextResponse.json({ feedbackList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
