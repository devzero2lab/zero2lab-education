import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectMongoDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close idle sockets after 45 seconds
      maxPoolSize: 100, // Maintain up to 100 concurrent connections
    });

    isConnected = connection.connections[0].readyState === 1; // 1 = connected
    console.log("Connected to MongoDB:", process.env.MONGODB_URI); // Optionally include the DB name
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Propagate the error for further handling
  }
};

export default connectMongoDB;
