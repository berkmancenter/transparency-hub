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
        const collection = database.collection('projects');

        const results = await collection.find({}).toArray();
        return new Response(JSON.stringify({ projects: results }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });
    } catch (error) {
        console.error('Error fetching project details:', error);
        return new Response(JSON.stringify({ error: "Database connection failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
