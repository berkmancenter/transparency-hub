import { connectToDatabase } from './mongodb';
import { Platform, Document as PolicyDocument } from '@/components/src/types';

const WAYBACK_URL = 'https://web.archive.org/web/';

type DocumentIndex = Record<string, Record<string, Record<string, string>>>;
type WaybackIndex = Record<string, Record<string, string>>;

function formatDate(date: Date): string {
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}

function buildDocumentIndex(documents: PolicyDocument[], typeMapping: Record<string, string>): DocumentIndex {
  return documents.reduce<DocumentIndex>((index, doc) => {
    const { date_fetched, public_url, formats } = doc;
    const type = typeMapping[doc.type] || doc.type;
    const date = formatDate(date_fetched);

    if (!index[type]) index[type] = {};
    if (!index[type][date]) index[type][date] = {};

    Object.entries(formats).forEach(([format, { extension }]) => {
      index[type][date][format] = `${public_url}.${extension}`;
    });

    return index;
  }, {});
}

function buildWaybackIndex(documents: PolicyDocument[], typeMapping: Record<string, string>): WaybackIndex {
  return documents.reduce<WaybackIndex>((index, doc) => {
    const { date_fetched, formats } = doc;
    const type = typeMapping[doc.type] || doc.type;
    const date = formatDate(date_fetched);
    const url_date = `${date_fetched.getFullYear()}${String(date_fetched.getMonth() + 1).padStart(2, '0')}${String(date_fetched.getDate()).padStart(2, '0')}000000`;

    const original_url = Object.values(formats)[0]?.original_url;
    if (!original_url) return index;

    if (!index[type]) index[type] = {};

    const isWaybackUrl = original_url.match(/web\.archive\.org/);
    index[type][date] = isWaybackUrl ? original_url : `${WAYBACK_URL}${url_date}/${original_url}`;
    return index;
  }, {});
}

export async function getPlatformData(platformName: string): Promise<{
  company: Platform;
  index: DocumentIndex;
  waybackIndex: WaybackIndex;
} | null> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) return null;

  const { database } = dbConnection;
  const company = await database
  .collection<Platform>('companies')
  .findOne({ name: platformName });
  
  if (!company) return null;

  const documents = await database
    .collection<PolicyDocument>('documents_v2')
    .find({ company_id: company._id.toString() })
    .toArray();

  const typeMapping: Record<string, string> = {};
  Object.keys(company.doc_urls).forEach(displayName => {
    typeMapping[displayName.toLowerCase().replace(/\s+/g, '_')] = displayName;
  });

  return {
    company,
    index: buildDocumentIndex(documents, typeMapping),
    waybackIndex: buildWaybackIndex(documents, typeMapping),
  };
}