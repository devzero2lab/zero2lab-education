import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Extract query parameters
  const videoUrl = searchParams.get("videoUrl");

  if (!videoUrl) {
    return NextResponse.json(
      { error: "No video URL provided" },
      { status: 400 }
    );
  }

  try {
    // Ensure the video URL has the correct base path if it's missing
    const fullUrl = videoUrl.startsWith("http")
      ? videoUrl
      : `http://147.93.19.33/${videoUrl}`;

    const response = await fetch(fullUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video" },
        { status: response.status }
      );
    }

    // We need to stream the response properly
    const body = response.body;
    const headers = response.headers;

    // Set the content-type for HLS streams
    headers.set("Content-Type", "application/vnd.apple.mpegurl");

    // Create a new response from the stream and send it back to the client
    return new NextResponse(body, {
      status: response.status,
      headers: headers,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: `Error fetching video: ${error.message}` },
      { status: 500 }
    );
  }
}
