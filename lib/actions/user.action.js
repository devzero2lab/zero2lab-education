import { User } from "@/models/user";
import connectMongoDB from "../db";

export async function createUser(userData) {
  if (!userData.clerkId || !userData.email) {
    throw new Error("ClerkId and email are required");
  }

  try {
    await connectMongoDB();

    const { user, created } = await User.findOrCreate({
      clerkId: userData.clerkId,
      email: userData.email,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    });

    console.log(created ? "New user created:" : "Existing user found:", user);

    return user;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}
