import mongoose, { Connection } from 'mongoose';

const MONGODB_ORDERS_URI = process.env.MONGODB_ORDERS_URI;

if (!MONGODB_ORDERS_URI) {
  throw new Error(
    'Please define the MONGODB_ORDERS_URI environment variable inside .env.local'
  );
}

declare global {
  var mongooseOrdersDb: { conn: Connection | null; promise: Promise<Connection> | null };
}

let cachedOrdersDb = global.mongooseOrdersDb;

if (!cachedOrdersDb) {
  cachedOrdersDb = global.mongooseOrdersDb = { conn: null, promise: null };
}

async function connectOrdersDb(): Promise<Connection> {
  if (cachedOrdersDb.conn) {
    return cachedOrdersDb.conn;
  }

  if (!cachedOrdersDb.promise) {
    const opts = {
      bufferCommands: false,
    };

    cachedOrdersDb.promise = mongoose.createConnection(MONGODB_ORDERS_URI!, opts).asPromise();
  }
  cachedOrdersDb.conn = await cachedOrdersDb.promise;
  return cachedOrdersDb.conn;
}

export default connectOrdersDb;