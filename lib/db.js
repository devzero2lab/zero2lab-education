import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// Use global cache to persist connection across hot reloads (important for serverless environments)
let cached = global.mongoose || { conn: null, promise: null };

const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new MongoDB connection");
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 connections in pool
      serverSelectionTimeoutMS: 5000, // Timeout if MongoDB is unavailable
      socketTimeoutMS: 45000, // Close inactive connections after 45s
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB.");
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Store the cache in the global object
global.mongoose = cached;

export default connectMongoDB;
