import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
    statics: {
      async findOrCreate(userData) {
        console.log("Starting findOrCreate with data:", userData);
        try {
          const user = await this.findOne({
            $or: [{ clerkId: userData.clerkId }, { email: userData.email }],
          });

          console.log("Find query result:", user);

          if (user) return { user, created: false };

          console.log("User not found, attempting to create...");
          const newUser = await this.create(userData);
          console.log("New user created:", newUser);
          return { user: newUser, created: true };
        } catch (error) {
          console.error("Error in findOrCreate:", {
            message: error.message,
            code: error.code,
            name: error.name,
          });

          if (error.code === 11000) {
            console.log("Handling duplicate key error...");
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
