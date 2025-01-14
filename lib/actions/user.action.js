import { User } from "@/models/user";
import connectMongoDB from "../db";

export async function createUser(user) {
  try {
    await connectMongoDB();

    // Check if a user with the same clerkId or email already exists
    const existingUser = await User.findOne({
      $or: [{ clerkId: user.clerkId }, { email: user.email }],
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    // Create a new user if not found
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
}
