import { NextResponse } from 'next/server';
import { getSignedCookies } from "@aws-sdk/cloudfront-signer";
import { auth } from "@clerk/nextjs/server";
import connectMongoDB from "@/lib/db";
import { UserCourse } from "@/models/userCourse";
import { Course } from "@/models/course";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // 1. Verify User Authentication via Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized access. Please log in." }, { status: 401 });
    }

    // 2. Extract courseId from query params
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // 3. Connect to Database and Verify Enrollment (queries run in parallel)
    await connectMongoDB();

    const [course, enrollment] = await Promise.all([
      Course.findById(courseId).select("uniqueName"),
      UserCourse.findOne({
        userId,
        courseId,
        status: { $in: ["Approved", "Completed"] }
      }).select("_id"),
    ]);

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    if (!enrollment) {
      return NextResponse.json(
        { error: "Access denied. You must purchase this course to view its videos." },
        { status: 403 }
      );
    }

    // Validated! Proceed to issue Signed Cookies.
    const cloudfrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;

    if (!cloudfrontDomain || !keyPairId || !privateKey) {
      console.error("Missing CloudFront Environment Variables");
      return NextResponse.json(
        { error: "Server configuration missing" },
        { status: 500 }
      );
    }

    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    // Cookies valid for 3 hours
    const dateLessThan = new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString();

    // 4. Intelligent Path Extraction
    // Use the actual videoUrl path from the DB to extract the case-correct S3 folder name.
    // The player passes the proxied URL (/api/proxy?videoUrl=<encoded_CF_url>), so we
    // unwrap the inner CloudFront URL before parsing.
    const videoUrlFromClient = searchParams.get('videoUrl');
    let resourceUrl = `${cloudfrontDomain}/courses/${course.uniqueName}/*`;

    if (videoUrlFromClient) {
      try {
        let cfUrl = videoUrlFromClient;
        // Unwrap proxied URLs: /api/proxy?videoUrl=https%3A%2F%2F...
        if (videoUrlFromClient.startsWith('/api/proxy')) {
          const proxyParams = new URL(videoUrlFromClient, 'http://localhost');
          cfUrl = proxyParams.searchParams.get('videoUrl') || videoUrlFromClient;
        }
        const urlObj = new URL(cfUrl);
        const pathParts = urlObj.pathname.split('/');
        // The structure is expected to be /courses/COURSE_FOLDER/...
        const courseFolderIndex = pathParts.indexOf('courses');
        if (courseFolderIndex !== -1 && pathParts[courseFolderIndex + 1]) {
          const actualCourseFolder = pathParts[courseFolderIndex + 1];
          resourceUrl = `${cloudfrontDomain}/courses/${actualCourseFolder}/*`;
        }
      } catch (e) {
        console.warn("Could not parse videoUrl for folder extraction, falling back to uniqueName.");
      }
    }

    const cookies = getSignedCookies({
      url: resourceUrl,
      keyPairId,
      privateKey: formattedPrivateKey,
      dateLessThan,
    });

    const response = NextResponse.json({ 
      message: "Access granted", 
      scopedPath: resourceUrl.replace(cloudfrontDomain, '') 
    });

    // Securely set the 3 required CloudFront signed cookies
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/'
    };
    
    response.cookies.set('CloudFront-Policy', cookies['CloudFront-Policy'], cookieOptions);
    response.cookies.set('CloudFront-Signature', cookies['CloudFront-Signature'], cookieOptions);
    response.cookies.set('CloudFront-Key-Pair-Id', cookies['CloudFront-Key-Pair-Id'], cookieOptions);

    return response;
  } catch (error) {
    console.error('Error generating signed cookies:', error);
    return NextResponse.json({ error: error.message || "Failed to sign cookies" }, { status: 500 });
  }
}