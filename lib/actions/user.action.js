import { User } from "@/models/user";
import connectMongoDB from "../db";

export async function createUser(user) {
  try {
    await connectMongoDB();

    // Check if a user with the same clerkId or email already exists
    const existingUser = await User.findOne({
      $or: [{ clerkId: user.clerkId }, { email: user.email }],
    });

    // If user exists, return the existing user
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    // If no user exists, create a new user
    const newUser = await User.create({
      clerkId: user.clerkId, // Assuming 'user' contains the clerkId from Clerk
      email: user.email, // Assuming 'user' contains the email
      firstName: user.firstName, // You can also add first name, last name, etc.
      lastName: user.lastName,
    });

    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
}
