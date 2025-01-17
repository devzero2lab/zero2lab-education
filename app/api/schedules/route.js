import connectMongoDB from '@/lib/db';
import { Schedule } from '@/models/schedule';
import { NextResponse } from 'next/server';

// Create a new schedule
export async function POST(request) {
  const { title, description, date, time, email } = await request.json();
  await connectMongoDB();

  try {
    // Create a new schedule with the provided data
    const newTopic = await Schedule.create({ title, description, date, time, email });

    // The meetingLink field will automatically be set to "Not Scheduled Yet" as per the schema
    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Get all schedules or schedules by email
export async function GET(request) {
  await connectMongoDB();

  // Extract the email query parameter from the request URL
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    let schedules;
    if (email) {
      // Fetch schedules for the specified email
      schedules = await Schedule.find({ email });
    } else {
      // Fetch all schedules if no email is provided
      schedules = await Schedule.find();
    }
    return NextResponse.json({ schedules }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}


// Update a schedule by ID
export async function PUT(request) {
  const { id, title, description, date, time, email, meetingLink } = await request.json();
  await connectMongoDB();

  try {
    // Find the schedule by ID and update it
    const updatedTopic = await Schedule.findByIdAndUpdate(
      id,
      { title, description, date, time, email, meetingLink },
      { new: true } // Return the updated document
    );

    if (!updatedTopic) {
      return NextResponse.json({ success: false, error: 'Schedule not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTopic, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}