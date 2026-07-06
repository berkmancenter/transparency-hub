import { connectToDatabase } from "./mongodb";

export async function getDatabaseCounts(): Promise<{ company_count: number; document_count: number, years_old: number }> {
  const dbConnection = await connectToDatabase();
  if (!dbConnection?.database) throw new Error("Database connection failed");

  const companies = await dbConnection.database.collection('companies');
  const documents = await dbConnection.database.collection('documents');

  const oldestDoc = await documents.find()
    .sort({ date_fetched: 1 })
    .limit(1)
    .toArray();

  let yearsOld: number;
  if (!oldestDoc || oldestDoc.length === 0) {
    yearsOld = 10;
  } else {
    yearsOld = Math.floor((new Date().getTime() - oldestDoc[0].date_fetched.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  }

  function superFloor(num: number): number {
    const powerOfTen = Math.pow(10, Math.floor(Math.log10(num)));
    return Math.floor(num / powerOfTen) * powerOfTen;
  }

  const company_results = await companies.countDocuments();
  const document_results = await documents.countDocuments();

  return { company_count: superFloor(company_results), document_count: superFloor(document_results), years_old: superFloor(yearsOld) }
}