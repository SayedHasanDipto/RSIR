import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your MONGODB_URI to .env');
}

let client;

if (process.env.NODE_ENV === 'development') {
  // Cache the client connection across Hot Module Replaces in dev mode
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db = client.db();

export { client, db };
