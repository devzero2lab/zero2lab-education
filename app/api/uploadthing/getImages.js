import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const uploadDir = path.join(process.cwd(), "public", "uploads"); // Path to uploaded images directory

  try {
    // Read the files from the directory
    const files = fs.readdirSync(uploadDir);

    // Generate URLs for the uploaded images
    const imageUrls = files.map((file) => `/uploads/${file}`);

    // Send the URLs as a response
    res.status(200).json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
