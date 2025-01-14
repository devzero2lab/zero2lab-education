// app/api/proxy/route.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req) {
  // Extract the path of the requested video file
  const { pathname } = new URL(req.url);

  // The video file name will be the last part of the path
  const videoFile = pathname.split('/').pop(); // Example: segment_002.ts

  // const FN = videoFile.split("_")[0];
  const FN = videoFile.split("_segment")[0];
  console.log(FN);

  // Construct the full external URL for the video
  const baseUrl = `http://147.79.66.105/video/uploads/${FN}/`;
  const fullUrl = `${baseUrl}${videoFile}`;
  

  try {
    // Fetch the video file from the external server
    const response = await fetch(fullUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch video' }, { status: response.status });
    }

    // Stream the video response back to the client
    const body = response.body;
    const headers = response.headers;

    // Set the appropriate content type for video streaming (e.g., .ts files)
    headers.set('Content-Type', 'video/MP2T');

    return new NextResponse(body, {
      status: response.status,
      headers: headers,
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: `Error fetching video: ${error.message}` }, { status: 500 });
  }
}
