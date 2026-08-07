import { connectToDatabase } from "@/components/lib/mongodb";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection || !dbConnection.database) {
      return new Response(JSON.stringify({ error: "Database connection failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { database } = dbConnection;
    const documents = database.collection('companies');

    const results = await documents.countDocuments();
    return new Response(JSON.stringify({ count: results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error counting platforms:', error);
    return new Response(JSON.stringify({ error: "Database connection failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
