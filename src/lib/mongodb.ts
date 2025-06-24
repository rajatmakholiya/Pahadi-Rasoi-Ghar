import mongoose, { Connection } from 'mongoose';

const MONGODB_LOGIN_URI = process.env.MONGODB_LOGIN_URI;


if (!MONGODB_LOGIN_URI) {
  throw new Error(
    'Please define the MONGODB_LOGIN_URI environment variable inside .env.local'
  );
}

// Use a specific global cache for the login database connection
let cachedLoginDb: { conn: Connection | null; promise: Promise<Connection> | null } = (global as any).mongooseLoginDb;

if (!cachedLoginDb) {
  cachedLoginDb = (global as any).mongooseLoginDb = { conn: null, promise: null };
}

async function connectLoginDb(): Promise<Connection> {
  if (cachedLoginDb.conn) {
    return cachedLoginDb.conn;
  }

  if (!cachedLoginDb.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedLoginDb.promise = mongoose.createConnection(MONGODB_LOGIN_URI!, opts).asPromise();
  }
  cachedLoginDb.conn = await cachedLoginDb.promise;
  return cachedLoginDb.conn;
}

export default connectLoginDb;