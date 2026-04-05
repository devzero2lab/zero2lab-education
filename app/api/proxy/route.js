import { NextResponse } from "next/server";

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
    // 1. Ensure the video URL is absolute (default to CloudFront if relative)
    let targetUrl = videoUrl;
    if (!videoUrl.startsWith("http")) {
      const cloudfrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || "https://d3n1lx2cxtpzxj.cloudfront.net";
      targetUrl = `${cloudfrontDomain.replace(/\/$/, "")}/${videoUrl.replace(/^\//, "")}`;
    }

    // 2. Extract CloudFront signed cookies from the client request
    const cookieHeader = req.headers.get("cookie") || "";
    
    // We only need to forward specific CloudFront cookies
    const cloudfrontCookies = cookieHeader
      .split(";")
      .filter(c => c.trim().startsWith("CloudFront-"))
      .join("; ");

    // 3. Fetch from the target URL with forwarded cookies
    const response = await fetch(targetUrl, {
      headers: {
        "Cookie": cloudfrontCookies,
        "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0",
      }
    });

    if (!response.ok) {
      console.error(`Proxy failed to fetch ${targetUrl}: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Failed to fetch upstream: ${response.status}` },
        { status: response.status }
      );
    }

    // 4. Handle Manifest Rewriting for HLS (.m3u8 files)
    // This ensures relative paths in the manifest also go through the proxy with cookies
    const contentType = response.headers.get("Content-Type") || "";
    if (targetUrl.endsWith(".m3u8") || contentType.includes("mpegurl")) {
      let manifestText = await response.text();
      
      // Determine the base URL for relative paths
      const targetUrlObj = new URL(targetUrl);
      const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf("/") + 1);

      // Regex to find paths in the manifest (not starting with http or #)
      // Matches lines that are URLs (usually after #EXTINF or #EXT-X-STREAM-INF)
      // Also handles URI="key.enc" in EXT-X-KEY
      
      // Handle simple paths
      manifestText = manifestText.split("\n").map(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("http")) {
          // It's a relative URL, rewrite it
          const absoluteUrl = new URL(trimmed, baseUrl).toString();
          return `/api/proxy?videoUrl=${encodeURIComponent(absoluteUrl)}`;
        }
        
        // Handle URI="..." in tags (like encryption keys)
        if (trimmed.startsWith("#") && trimmed.includes('URI=')) {
          return line.replace(/URI="([^"]+)"/, (match, p1) => {
            // INTELLIGENT FIX: If the manifest points to our local get-key API
            // we must inject the full CloudFront context so get-key knows WHICH key to fetch.
            if (p1.includes("/api/get-key")) {
              const encKeyUrl = baseUrl + "enc.key";
              return `URI="/api/get-key?videoUrl=${encodeURIComponent(encKeyUrl)}"`;
            }

            if (p1.startsWith("http")) return match;
            const absoluteUrl = new URL(p1, baseUrl).toString();
            return `URI="/api/proxy?videoUrl=${encodeURIComponent(absoluteUrl)}"`;
          });
        }
        
        return line;
      }).join("\n");

      return new NextResponse(manifestText, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Cache-Control": "no-cache",
        },
      });
    }

    // 5. Stream other responses (.ts segments, .key files)
    const body = response.body;
    const headers = new Headers(response.headers);

    headers.set("Access-Control-Allow-Origin", "*");

    // .ts segments are immutable for recorded courses — allow browser caching to
    // prevent re-fetching the same segment on seek or lesson revisit.
    if (targetUrl.endsWith(".ts")) {
      headers.set("Cache-Control", "public, max-age=3600");
    }

    return new NextResponse(body, {
      status: response.status,
      headers: headers,
    });
  } catch (error) {
    console.error("Error in video proxy:", error);
    return NextResponse.json(
      { error: `Proxy Error: ${error.message}` },
      { status: 500 }
    );
  }
}
