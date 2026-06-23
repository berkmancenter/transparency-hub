import { getAllPlatforms } from "@/components/lib/getAllPlatforms";

export async function GET() {
  try {
    const companies = await getAllPlatforms();
    return new Response(JSON.stringify({ companies }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return new Response(JSON.stringify({ error: "Database connection failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}