import { connectToDatabase } from './mongodb';
import { Platform, Document as PolicyDocument } from '@/components/src/types';

function formatDate(date: Date): string {
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}

// Returns the newest date_fetched for the policy as MM/DD/YYYY
export async function getFallbackDate(platformName: string, policyName: string): Promise<string | null> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) return null;

  const { database } = dbConnection;
  const company = await database
    .collection<Platform>('companies')
    .findOne({ name: platformName });

  if (!company) return null;

  const policyKey = policyName.toLowerCase().replace(/\s+/g, '_');
  const document = await database
    .collection<PolicyDocument>('documents_v2')
    .findOne({ company_id: company._id.toString(), type: policyKey }, { sort: { date_fetched: -1 } });

  return document ? formatDate(document.date_fetched) : null;
}
