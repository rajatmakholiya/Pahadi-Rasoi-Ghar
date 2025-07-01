import mongoose, { Connection } from 'mongoose';

const MONGODB_MENU_URI = process.env.MONGODB_MENU_URI;

if (!MONGODB_MENU_URI) {
  throw new Error(
    'Please define the MONGODB_MENU_URI environment variable inside .env.local'
  );
}

declare global {
  var mongooseMenuDb: { conn: Connection | null; promise: Promise<Connection> | null };
}

let cachedMenuDb = global.mongooseMenuDb;

if (!cachedMenuDb) {
  cachedMenuDb = global.mongooseMenuDb = { conn: null, promise: null };
}

async function connectMenuDb(): Promise<Connection> {
  if (cachedMenuDb.conn) {
    return cachedMenuDb.conn;
  }

  if (!cachedMenuDb.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedMenuDb.promise = mongoose.createConnection(MONGODB_MENU_URI!, opts).asPromise();
  }
  cachedMenuDb.conn = await cachedMenuDb.promise;
  return cachedMenuDb.conn;
}

export default connectMenuDb;