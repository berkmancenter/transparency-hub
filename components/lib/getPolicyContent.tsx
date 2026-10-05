import { connectToDatabase } from "./mongodb";
import { Document as PolicyDocument } from '@/components/src/types';

function formatDate(date: Date): string {
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}

// Returns the capture closest to `date` (MM/DD/YYYY): its own date, and its text content
// (null when that capture has no txt format or the fetch fails)
export async function getPolicyContent(platformName: string, policyName: string, date: string): Promise<{
  date: string;
  content: string | null;
} | null> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) return null;

  const { database } = dbConnection;
  const company = await database
    .collection('companies')
    .findOne({ name: platformName });

  if (!company) return null;

  const policyKey = policyName.toLowerCase().replace(/\s+/g, '_');

  // Date arrives as MM/DD/YYYY (e.g. 05/01/2013)
  const [month, day, year] = date.split('/').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const nextDay = new Date(year, month - 1, day + 1);
  if (isNaN(targetDate.getTime())) return null;

  // Prefer a capture from the requested day (one with txt if that day has several, since
  // the platform index merges a day's captures), otherwise fall back to the closest capture
  const [document] = await database
    .collection('documents_v2')
    .aggregate<PolicyDocument>([
      { $match: { company_id: company._id.toString(), type: policyKey } },
      { $addFields: {
        sameDay: { $and: [{ $gte: ["$date_fetched", targetDate] }, { $lt: ["$date_fetched", nextDay] }] },
        hasTxt: { $ne: [{ $type: "$formats.txt" }, "missing"] },
        dateDiff: { $abs: { $subtract: ["$date_fetched", targetDate] } },
      } },
      { $addFields: { sameDayTxt: { $and: ["$sameDay", "$hasTxt"] } } },
      { $sort: { sameDay: -1, sameDayTxt: -1, dateDiff: 1 } },
      { $limit: 1 }
    ])
    .toArray();

  if (!document) return null;

  const txt = document.formats?.txt;
  if (!txt) return { date: formatDate(document.date_fetched), content: null };

  // Fetch the text capture from the Google Storage bucket
  let content: string | null = null;
  try {
    const response = await fetch(`${document.public_url}.${txt.extension}`);
    if (response.ok) content = await response.text();
  } catch {
    // Network failure reaching GCS; render without content rather than erroring the page
  }

  return { date: formatDate(document.date_fetched), content };
}
