import { User } from "@/models/user";
import connectMongoDB from "../db";

export async function createUser(user) {
  try {
    await connectMongoDB();
    // Check if the user already exists
    const existingUser = await User.findOne({ clerkId: user.clerkId });
    if (existingUser) {
      return existingUser;
    }
    // Create a new user if not found
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
}
