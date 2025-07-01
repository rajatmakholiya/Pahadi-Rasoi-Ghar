import mongoose, { Connection } from 'mongoose';

const MONGODB_LOGIN_URI = process.env.MONGODB_LOGIN_URI;


if (!MONGODB_LOGIN_URI) {
  throw new Error(
    'Please define the MONGODB_LOGIN_URI environment variable inside .env.local'
  );
}

declare global {
  var mongooseLoginDb: { conn: Connection | null; promise: Promise<Connection> | null };
}

let cachedLoginDb = global.mongooseLoginDb;

if (!cachedLoginDb) {
  cachedLoginDb = global.mongooseLoginDb = { conn: null, promise: null };
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