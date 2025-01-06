import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload completed: ", file.url); // You can log the URL here if needed
      // Return a response with the image URL (you can adjust this to your needs)
      return { url: file.url };
    }
  ),
};
