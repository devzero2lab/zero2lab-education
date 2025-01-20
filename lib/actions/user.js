import { User } from "@/models/user";
import connectMongoDB from "../db";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  email_addresses
) => {
  try {
    await connectMongoDB();

    const email =
      email_addresses && email_addresses.length > 0
        ? email_addresses[0].email_address
        : null;

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          email: email,
        },
      },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connectMongoDB();

    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
  }
};
