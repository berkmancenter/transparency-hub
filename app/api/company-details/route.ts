import { getPlatformData } from "@/components/lib/getPlatformData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platformName = decodeURIComponent(searchParams.get('q') || '');

    const data = await getPlatformData(platformName);

    if (!data) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error('Error fetching company details:', error);
    return new Response(JSON.stringify({ error: "Error fetching company details" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}