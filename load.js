import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  const { filename } = req.query;
  if (!filename) {
    res.status(400).send('Missing filename');
    return;
  }
  const dataDir = path.join(process.cwd(), 'data');
  fs.readFile(path.join(dataDir, filename), 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.json({ content: data });
  });
}