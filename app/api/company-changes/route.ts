import { connectToDatabase } from "../../../components/lib/mongodb";

type Changes = {
  older_document: {
    id: string;
    path: string;
    date_fetched: string;
  },
  newer_document: {
    id: string;
    path: string;
    date_fetched: string;
  },
  topic_changes: {
    [key: string]: (boolean | string[])[];
  };
  diff: [string, boolean, boolean][];
}

function parseDates({date1, date2} : {date1: string; date2: string}) : Date[] {
  // dateStr format: "MM/DD/YYYY"
  const [month1, day1, year1] = date1.split('/').map(Number);
  const [month2, day2, year2] = date2.split('/').map(Number);
  const date1Obj = new Date(year1, month1 - 1, day1); // month is 0-indexed in JS
  const date2Obj = new Date(year2, month2 - 1, day2); // month is 0-indexed in JS
  // Make sure date1 is before date2
  if (date1Obj > date2Obj) {
    return [date2Obj, date1Obj];
  } else {
    return [date1Obj,date2Obj];
  }
}

async function getFile(url: string): Promise<Changes> {
  console.log('Fetching from GCS...', url);
  const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
  if (!response.ok && response.status !== 0) {
    throw new Error('Network response was not ok');
  }
  const text = await response.text();

  const changes: Changes = JSON.parse(text);
  return changes;
}

function cleanTextArray(arrays: [string, boolean][]): [string, boolean][] {
  // Removes excess whitespace on render
  let index = 0;
  let string = "";
  while (index < arrays.length) {
    // Check if line is empty
    if (arrays[index][0].match(/^\s*$/)) {
      string += arrays[index][0];
      // Three consecutive empty lines
      if (string.match(/(\n[\s]*){3,}/g)) {
        arrays.splice(index, 1);
        // Don't increment index
      } else {
        index++;
      }
    } else {
      // A line with content, reset
      string = "";
      index++;
    }
  }
  
  return arrays;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const docType = searchParams.get('docType');
    const baseRev = searchParams.get('baseRev');
    const secondaryRev = searchParams.get('secondaryRev');
    if (!platform || !docType || !baseRev || !secondaryRev) {
        return new Response(JSON.stringify({ error: "Missing required parameters" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    };
    const [baseRevDate, secondaryRevDate] = parseDates({date1: baseRev, date2: secondaryRev});

    const dbConnection = await connectToDatabase();
    if (!dbConnection || !dbConnection.database) {
        return new Response(JSON.stringify({ error: "Database connection failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

    const { database } = dbConnection;
    const companies = database.collection('companies');
    const collection = database.collection('changes');

    const company = await companies.findOne({ name: platform });

    if (!company) {
      console.log('Company not found');
      return new Response(JSON.stringify({ error: "Company not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
      });
    }

    // Conversion from date params to a best fit mongo query
    const query = [{ 
        $match: {
          company_id: company._id.toString(),
          type: docType.replaceAll(' ', '_').toLowerCase()
        }
      }, {
        $addFields: {
          baseDiff: {
            $abs: {
              $subtract: ["$older_date_fetched", new Date(baseRevDate)]
            }
          },
          secondaryDiff: {
            $abs: {
              $subtract: ["$newer_date_fetched", new Date(secondaryRevDate)]
            }
          }
        }
      }, {
        $addFields: {
          totalDiff: { $add: ["$baseDiff", "$secondaryDiff"] }
        }
      }, {
        $sort: { totalDiff: 1 }
      }, {
        $limit: 1
    }];

    const changes = await collection.aggregate(query)
      .toArray();
    
    if (!changes || changes.length === 0) {
        // Add client-side fallback
        return new Response(JSON.stringify({ error: "No changes found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }

    console.log('Processing change');
    
    const change: Changes = await getFile(changes[0].public_url);

    console.log('Change data retrieved:', {
      hasTopicChanges: !!change?.topic_changes,
      hasDiff: !!change?.diff
    });
    
    const keys = change["topic_changes"];
    const keysAdded = Object.keys(keys).filter(key => keys[key][0]);
    const keysRemoved = Object.keys(keys).filter(key => keys[key][1]);
    
    // Process diff tokens with change flags
    const baseRevContent: Array<[ string, boolean ]> = [];
    const secondaryRevContent: Array<[ string, boolean ]> = [];
    let wordChanges = 0;
    
    change["diff"].forEach(token => {
      const text = String(token[0]);
      const isAdded = token[1];
      const isRemoved = token[2];
      
      // baseRevContent: unchanged or removed content
      if (!isAdded) {
        const updates = text.trim().split(/\s+/g).filter(word => word.match(/[a-zA-Z0-9]+/));
        wordChanges -= isRemoved ? updates.length : 0;
        baseRevContent.push([ text, isRemoved ]);
      }
      
      // secondaryRevContent: unchanged or added content
      if (!isRemoved) {
        const updates = text.trim().split(/\s+/g).filter(word => word.match(/[a-zA-Z0-9]+/));
        wordChanges += isAdded ? updates.length : 0;
        secondaryRevContent.push([ text, isAdded ]);
      }
    });

    const responsePayload = {
      wordChanges: wordChanges,
      keysAdded: keysAdded,
      keysRemoved: keysRemoved,
      baseRevContent: cleanTextArray(baseRevContent),
      secondaryRevContent: cleanTextArray(secondaryRevContent)
    };
    console.log('Returning response:', {
      status: 200,
      payloadSize: JSON.stringify(responsePayload).length,
      baseContentLength: baseRevContent.length,
      secondaryContentLength: secondaryRevContent.length
    });

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error fetching company changes:', error);
    return new Response(JSON.stringify(
      { error: 'Error fetching Company Changes' }), { 
        status: 500,
        headers: { 
          "Content-Type": "application/json"
        }
    });
  }
}