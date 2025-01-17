import connectMongoDB from '@/lib/db';
import { Schedule } from '@/models/schedule';
import { NextResponse } from 'next/server';

// Get all records with pagination
export async function GET(request) {
  await connectMongoDB();

  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1; // Default to page 1
    const limit = parseInt(searchParams.get('limit')) || 10; // Default to 10 records per page

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch schedules with pagination
    const schedules = await Schedule.find()
      .skip(skip)
      .limit(limit);

    // Get the total number of schedules for pagination metadata
    const totalTopics = await Schedule.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalTopics / limit);

    return NextResponse.json(
      {
        schedules,
        pagination: {
          page,
          limit,
          totalTopics,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}