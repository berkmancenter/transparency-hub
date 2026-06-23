import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('q');

    const dbConnection = await connectToDatabase();
    if (!dbConnection || !dbConnection.database) {
      return new Response(JSON.stringify({ error: "Database connection failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { database } = dbConnection;
    const collection = database.collection('companies')

    const company = await collection.findOne({ name: platform });

    if (!company) {
      console.log('Company not found');
      return new Response(JSON.stringify({ error: "Company not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
      });
    }
    
    type ChangeDoc = { type: string; older_date_fetched: string | Date; newer_date_fetched: string | Date };

    const documents = await database.collection('changes')
      .find({ company_id: company._id.toString() })
      .sort({ type: 1, newer_date_fetched: 1 })
      .toArray() as ChangeDoc[];

    const typeMapping: Record<string, string> = {};
    const docTypes = Object.keys(company.doc_urls);

    docTypes.forEach(displayName => {
      const dbValue = displayName.toLowerCase().replace(/\s+/g, '_');
      typeMapping[dbValue] = displayName;
    });

    const documentsByType = documents.reduce((acc: Record<string, string[]>, doc: ChangeDoc) => {
      const displayName = typeMapping[doc.type] || doc.type;

      if (!acc[displayName]) {
        acc[displayName] = [];
      }
      
      const formatDate = (dateStr: string | Date
      ) => {
        const date = new Date(dateStr);
        return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
      };

      const olderFormatted = formatDate(doc.older_date_fetched);
      const newerFormatted = formatDate(doc.newer_date_fetched);

      for (const date of [olderFormatted, newerFormatted]) {
        if (!acc[displayName].includes(date)) {
          acc[displayName].push(date);
        }
      }
      
      return acc;
    }, {} as Record<string, string[]>);

    console.log('documentsByType:', JSON.stringify(documentsByType, null, 2));

    Object.keys(documentsByType).forEach(type => {
      documentsByType[type].sort((a: string, b: string) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      });
    });

    console.log('docTypes:', JSON.stringify(docTypes, null, 2));
    return new Response(JSON.stringify({
      company_id: company._id.toString(),
      docTypes: docTypes,
      documentsByType: documentsByType
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching docTypes:', error);
    return new Response(JSON.stringify(
      { error: 'Error fetching docTypes' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}