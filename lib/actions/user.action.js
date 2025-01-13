import { User } from "@/models/user";
import connectMongoDB from "../db";

export async function createUser(user) {
  try {
    await connectMongoDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error creating user", error: error.message }),
      { status: 500 }
    );
  }
}
