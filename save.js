import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  const { filename, content } = req.body;
  if (!filename || typeof content !== 'string') {
    res.status(400).send('Missing filename or content');
    return;
  }
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  fs.writeFile(path.join(dataDir, filename), content, err => {
    if (err) return res.status(500).send('Error saving file');
    res.send('Saved!');
  });
}