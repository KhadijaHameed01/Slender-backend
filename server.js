import express from 'express';
import { join } from 'path';
import cors from 'cors';
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Route to serve blogs from blogData.json
app.get('/blogs', (req, res) => {
  const filePath = join(__dirname, 'api', 'blogData.json');
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading blogData.json:', err);
      res.status(500).json({ error: 'Unable to fetch blog posts' });
    } else {
      res.json(JSON.parse(data)); 
    }
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Blog API! Use /blogs to fetch blog posts.');
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on https://slender-backend.vercel.app/${PORT}`);
});
