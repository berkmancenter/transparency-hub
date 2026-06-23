import { connectToDatabase } from "./mongodb";

export type DocumentTypesResult = {
  company_id: string;
  docTypes: string[];
  documentsByType: Record<string, string[]>;
};

function formatDate(dateStr: string | Date): string {
  const date = new Date(dateStr);
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
}

export async function getDocumentTypes(platformName: string): Promise<DocumentTypesResult | null> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) throw new Error("Database connection failed");

  const { database } = dbConnection;

  const company = await database.collection('companies').findOne({ name: platformName });
  if (!company) return null;

  const documents = await database.collection('changes')
    .find({ company_id: company._id.toString() })
    .sort({ type: 1, newer_date_fetched: 1 })
    .toArray();

  const typeMapping: Record<string, string> = {};
  Object.keys(company.doc_urls).forEach(displayName => {
    typeMapping[displayName.toLowerCase().replace(/\s+/g, '_')] = displayName;
  });

  const documentsByType = documents.reduce((acc: Record<string, string[]>, doc) => {
    const displayName = typeMapping[doc.type] || doc.type;
    if (!acc[displayName]) acc[displayName] = [];

    for (const date of [formatDate(doc.older_date_fetched), formatDate(doc.newer_date_fetched)]) {
      if (!acc[displayName].includes(date)) acc[displayName].push(date);
    }
    return acc;
  }, {});

  Object.keys(documentsByType).forEach(type => {
    documentsByType[type].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  });

  return {
    company_id: company._id.toString(),
    docTypes: Object.keys(company.doc_urls),
    documentsByType,
  };
}