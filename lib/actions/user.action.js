import { User } from "@/models/user";
import connectMongoDB from "../db";

export async function createUser(userData) {
  console.log("Starting createUser with data:", userData);

  if (!userData.clerkId || !userData.email) {
    console.error("Missing required fields:", {
      clerkId: !!userData.clerkId,
      email: !!userData.email,
    });
    throw new Error("ClerkId and email are required");
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    await connectMongoDB();
    console.log("MongoDB connection successful");

    console.log("Attempting to find or create user...");
    const { user, created } = await User.findOrCreate({
      clerkId: userData.clerkId,
      email: userData.email,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    });

    console.log(created ? "New user created:" : "Existing user found:", user);
    return user;
  } catch (error) {
    console.error("Detailed error in createUser:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    throw error;
  }
}
