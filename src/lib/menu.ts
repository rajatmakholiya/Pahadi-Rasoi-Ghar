import mongoose from 'mongoose';

const MONGODB_MENU_URI = process.env.MONGODB_MENU_URI;

if (!MONGODB_MENU_URI) {
  throw new Error(
    'Please define the MONGODB_MENU_URI environment variable inside .env.local'
  );
}

let cached = (global as any).mongooseDefault;

if (!cached) {
  cached = (global as any).mongooseDefault = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_MENU_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;