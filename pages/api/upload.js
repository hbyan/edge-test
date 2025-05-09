import formidable from 'formidable';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import Papa from 'papaparse';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uri = process.env.MONGODB_URI;
const dbName = 'fixtures';
const collectionName = 'uploads';

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = await parseForm(req);
    const uploadedFile = files.file[0];
    if (!uploadedFile || !uploadedFile.filepath) {
      return res.status(400).json({ error: 'No file uploaded or filepath missing' });
    }

    const fileContent = fs.readFileSync(uploadedFile.filepath, 'utf8');
    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data || parsed.data.length === 0) {
      return res.status(400).json({ error: 'CSV file is empty or invalid' });
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(parsed.data);
    await client.close();

    return res.status(200).json({ insertedCount: result.insertedCount });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload or database error' });
  }
}