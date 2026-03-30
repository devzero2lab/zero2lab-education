import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

/**
 * Global connection cache.
 * Vercel/serverless වල function instance නැවත reuse කෙරේ.
 * global variable නොමැතිව, request සෑම එකෙකදීම නව connection ගෙනෙයි.
 */
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  // Connection already ඇත්නම් reuse කරයි
  if (cached.conn) {
    return cached.conn;
  }

  // Pending promise ඇත්නම් await කරයි (duplicate connections avoid)
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Error ලදී නම් retry සඳහා clear කරයි
    throw error;
  }

  return cached.conn;
};

export default connectMongoDB;