import { getDatabaseCounts } from "@/components/lib/getDatabaseCounts";

export async function GET() {
  try {
    const counts = await getDatabaseCounts();
    return new Response(JSON.stringify( counts ), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error('Error fetching database counts:', error);
    return new Response(JSON.stringify({ error: "Database connection failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}