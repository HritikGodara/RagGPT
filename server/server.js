const express = require('express');
const cors = require('cors');
require('dotenv').config();
// If you have routes in another file, import them here
// const postroute = require('./postroute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use('/api/v1', postroute); // Uncomment if you have additional routes

app.get('/test', (req, res) => {
  res.json({ message: 'Testing successful...' });
});

// Example: Accessing env variable
app.get('/env', (req, res) => {
  res.json({ GROQ_API_KEYS: process.env.GROQ_API_KEYS });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
