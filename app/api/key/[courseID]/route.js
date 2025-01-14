import path from 'path';
import fs from 'fs';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../auth/[...nextauth]/route';
import { CourseAccess } from '@/models/courseAccess';
import { Course } from "@/models/course";
import { User } from "@/models/user";

export async function GET(request, { params }) {
  try {
    // Extract courseID from the query parameters
    

    // Retrieve the session
    const session = await getServerSession(authOptions);

    // Validate session and user access
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }



    // Define the path to the encryption key file
    const keyFilePath = path.join(process.cwd(), 'public', 'encryption.key');

    // Check if the file exists
    if (!fs.existsSync(keyFilePath)) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    } 

    // Read the file from the file system
    const fileBuffer = fs.readFileSync(keyFilePath);

    // Return the file as a response with the correct content type
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="encryption.key"',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process the request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
