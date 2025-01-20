

import connectMongoDB from '@/lib/db';
import { Schedule } from '@/models/schedule';
import { NextResponse } from 'next/server';

// Create a new schedule
export async function POST(request) {
  const { title, description, date, time, email } = await request.json();
  await connectMongoDB();

  try {
    const newTopic = await Schedule.create({ title, description, date, time, email });
    
    // Fetch all schedules after creating a new one
    const schedules = await Schedule.find();
    
    return NextResponse.json({ newTopic, schedules }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Fetch schedules by email
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  await connectMongoDB();

  try {
    const schedules = await Schedule.find({ email });
    return NextResponse.json({ schedules }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Update a schedule by ID
export async function PUT(request) {
  const { id, title, description, date, time, email, meetingLink, isCompleted } = await request.json();
  await connectMongoDB();

  try {
    // Find the schedule by ID and update it
    const updatedTopic = await Schedule.findByIdAndUpdate(
      id,
      { title, description, date, time, email, meetingLink, isCompleted },
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