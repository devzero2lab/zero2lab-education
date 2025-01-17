import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true, // Add index for better query performance
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Add index for better query performance
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    // Add better error handling for duplicate keys
    statics: {
      async findOrCreate(userData) {
        try {
          const user = await this.findOne({
            $or: [{ clerkId: userData.clerkId }, { email: userData.email }],
          });

          if (user) return { user, created: false };

          const newUser = await this.create(userData);
          return { user: newUser, created: true };
        } catch (error) {
          if (error.code === 11000) {
            // Handle duplicate key error
            const user = await this.findOne({
              $or: [{ clerkId: userData.clerkId }, { email: userData.email }],
            });
            return { user, created: false };
          }
          throw error;
        }
      },
    },
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
