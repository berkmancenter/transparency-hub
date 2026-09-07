import { zipSync } from "fflate";
import { connectToDatabase } from "@/components/lib/mongodb";
import { Platform, Document as PolicyDocument } from "@/components/src/types";

function formatDate(date: Date): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platformName = decodeURIComponent(searchParams.get('q') || '');

    const dbConnection = await connectToDatabase();
    if (!dbConnection?.database) {
      return new Response(JSON.stringify({ error: "Database connection failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { database } = dbConnection;
    const company = await database
      .collection<Platform>('companies')
      .findOne({ name: platformName });

    if (!company) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const documents = await database
      .collection<PolicyDocument>('documents_v2')
      .find({ company_id: company._id.toString(), "formats.txt": { $exists: true } })
      .toArray();

    if (documents.length === 0) {
      return new Response(JSON.stringify({ error: "No text captures available for this platform" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const typeMapping: Record<string, string> = {};
    Object.keys(company.doc_urls || {}).forEach(displayName => {
      typeMapping[displayName.toLowerCase().replace(/\s+/g, '_')] = displayName;
    });

    const usedNames = new Set<string>();
    const entries: Record<string, Uint8Array> = {};

    const fetched = await Promise.all(documents.map(async (doc) => {
      const response = await fetch(`${doc.public_url}.txt`);
      if (!response.ok) return null;
      const buffer = await response.arrayBuffer();
      const typeLabel = slugify(typeMapping[doc.type] || doc.type);
      let name = `${typeLabel}_${formatDate(doc.date_fetched)}.txt`;
      let suffix = 2;
      while (usedNames.has(name)) {
        name = `${typeLabel}_${formatDate(doc.date_fetched)}_${suffix}.txt`;
        suffix += 1;
      }
      usedNames.add(name);
      return { name, data: new Uint8Array(buffer) };
    }));

    fetched.forEach((file) => {
      if (file) entries[file.name] = file.data;
    });

    if (Object.keys(entries).length === 0) {
      return new Response(JSON.stringify({ error: "Failed to fetch any text captures" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const zipped = zipSync(entries, { level: 6 });

    return new Response(zipped, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slugify(platformName)}-txt-captures.zip"`,
      },
    });
  } catch (error) {
    console.error('Error building captures download:', error);
    return new Response(JSON.stringify({ error: "Error building captures download" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
