import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return { url: file.url };
    }
  ),
  blogImageUploader: f({ image: { maxFileSize: "8MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      return { url: file.url };
    }
  ),
};
