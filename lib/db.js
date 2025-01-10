import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectMongoDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });

    isConnected = connection.connections[0].readyState === 1; // 1 = connected
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;
