import { connectToDatabase } from "@/components/lib/mongodb";

function escapeRegex(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const dbConnection = await connectToDatabase();
    if (!dbConnection || !dbConnection.database) {
        return new Response(JSON.stringify({ error: "Database connection failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
    const { database } = dbConnection;
    const collection = database.collection('companies');

    let mongoQuery = {};
    if (query) {
        const safeQuery = escapeRegex(query);
        const words = query.trim().split(/\s+/);
        
        if (words.length === 1) {
            mongoQuery = {
                name: { $regex: safeQuery, $options: 'i' }
            };
        } else {
            mongoQuery = {
                $and: words.map(word => ({
                    name: { $regex: escapeRegex(word), $options: 'i' }
                }))
            };
        }
    }

    const results = await collection.find(mongoQuery).sort({ name: 1 }).toArray();
    return new Response(JSON.stringify({ companies: results }), {
        status: 200,
        headers: { 
            "Content-Type": "application/json",
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
         }
    });

}