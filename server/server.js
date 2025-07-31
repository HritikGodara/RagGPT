const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get('/test', (req, res) => {
  res.json({ message: 'Testing successful...' });
});

app.get('/env', (req, res) => {
  res.json({ GROQ_API_KEYS: process.env.GROQ_API_KEYS });
});

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false
  });
});

app.post('/upload_pdfs/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
