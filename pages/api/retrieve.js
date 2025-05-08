import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'fixtures';
const collectionName = 'uploads';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;
  if (typeof query !== 'string' || query.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing query parameter' });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const fixtures = await collection.find({
          $or: [
            { home_team: { $regex: query, $options: 'i' } },
            { away_team: { $regex: query, $options: 'i' } },
          ]
        }).toArray();

    res.status(200).json(fixtures);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
