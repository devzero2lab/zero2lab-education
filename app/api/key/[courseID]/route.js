import path from 'path';
import fs from 'fs';


export async function GET(request, { params }) {
  try {
    
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
