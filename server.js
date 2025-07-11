const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Save file endpoint
app.post('/save', (req, res) => {
  const { filename, content } = req.body;
  if (!filename || typeof content !== 'string') {
    return res.status(400).send('Missing filename or content');
  }
  fs.writeFile(path.join(dataDir, filename), content, err => {
    if (err) return res.status(500).send('Error saving file');
    res.send('Saved!');
  });
});

// Load file endpoint
app.get('/load', (req, res) => {
  const { filename } = req.query;
  if (!filename) return res.status(400).send('Missing filename');
  fs.readFile(path.join(dataDir, filename), 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.send({ content: data });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));