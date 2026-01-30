import mongoose from "mongoose";

const RAW_MONGODB_URI = process.env.MONGODB_URI;

if (!RAW_MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Clean the URI: remove whitespace and fix common typos
const MONGODB_URI = RAW_MONGODB_URI.trim()
  .replace(/[\s\t\n\r]/g, '')
  .replace(/\.net\.net/g, '.net');

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 * 
 * Type definition for mongoose cache
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    
    // Provide helpful error messages for common connection issues
    if (e.message?.includes('ENOTFOUND') || e.message?.includes('querySrv')) {
      const errorMsg = `MongoDB Connection Error: ${e.message}\n\n` +
        `Possible issues:\n` +
        `1. Check your MONGODB_URI in .env.local\n` +
        `2. Make sure cluster name is "cluster0" (zero) not "clusterO" (letter O)\n` +
        `3. Verify your MongoDB Atlas cluster is running\n` +
        `4. Check your network connection and firewall settings`;
      throw new Error(errorMsg);
    }
    
    throw e;
  }

  return cached.conn;
};
