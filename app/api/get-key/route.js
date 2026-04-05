import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('videoUrl');

    if (!videoUrl) {
      console.warn("Attempt to access get-key without videoUrl context.");
      return new NextResponse('Video URL context is required. Please access through the secure proxy.', { status: 400 });
    }

    // 1. Initial attempt: Search for enc.key in the same location as requested
    let keyUrl = videoUrl.replace(/[^\/]+\.m3u8$/, 'enc.key');

    // Extract CloudFront signed cookies
    const cookieHeader = request.headers.get("cookie") || "";
    const cloudfrontCookies = cookieHeader
      .split(";")
      .filter(c => c.trim().startsWith("CloudFront-"))
      .join("; ");

    const fetchOptions = {
      headers: {
        "Cookie": cloudfrontCookies,
        "User-Agent": request.headers.get("user-agent") || "Mozilla/5.0",
      }
    };

    let res = await fetch(keyUrl, fetchOptions);
    
    // 2. INTELLIGENT FALLBACK: If 403/404, try searching for enc.key in the PARENT folder
    // This handles cases where the playlist is in stream_0/ but the key is in video1/
    if (!res.ok && (res.status === 403 || res.status === 404)) {
        console.log(`Key not found in child folder: ${keyUrl}. Trying parent folder...`);
        
        // Transform .../folder/enc.key -> .../enc.key
        const parentKeyUrl = keyUrl.replace(/\/[^\/]+\/[^\/]+$/, '/enc.key');
        
        if (parentKeyUrl !== keyUrl) {
            console.log(`Attempting fallback to: ${parentKeyUrl}`);
            res = await fetch(parentKeyUrl, fetchOptions);
        }
    }

    if (!res.ok) {
        console.error(`Failed to fetch key from upstream (including fallback): ${res.status}`);
        return new NextResponse(`Upstream Auth Error: ${res.status}`, { status: res.status });
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error fetching encryption key:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
