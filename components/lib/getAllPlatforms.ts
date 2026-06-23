import { connectToDatabase } from "./mongodb";
import { Platform } from "@/components/src/types";

export async function getAllPlatforms(): Promise<Platform[]> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) throw new Error("Database connection failed");

  const results = await dbConnection.database
    .collection<Platform>('companies')
    .find({})
    .sort({ name: 1 })
    .toArray();

  return results;
}