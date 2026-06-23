import { MongoClient, Db } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const dbName = process.env.NEXT_ATLAS_DATABASE;

if (!uri) throw new Error("Please add your Mongo URI to .env");
if (!dbName) throw new Error("Please add your Mongo database name to .env");

const options = {};

// Extend the global type to persist the client across hot reloads in dev
declare global {
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export async function connectToDatabase(): Promise<{ mongoClient: MongoClient; database: Db }> {
  if (!client.connect) throw new Error("MongoClient failed to initialize");
  await client.connect();
  const database = client.db(dbName);
  return { mongoClient: client, database };
}