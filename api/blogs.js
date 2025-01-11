import express from 'express';
import cors from 'cors';
import { readFile } from 'fs';
import { join } from 'path';

const app = express();
const PORT = 5000;

//  connection for localhost and Netlify
app.use(cors({
  origin: [
    'http://localhost:5173',           // For local development
     'https://slender-khadija.netlify.app'  //Production frontend URL
  ]
}));

// Your API routes here...
app.get('/api/blogs', (req, res) => {
  const filePath = join(process.cwd(), 'api', 'blogData.json');
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading blogData.json:', err);
      res.status(500).json({ error: 'Unable to fetch blog posts' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

