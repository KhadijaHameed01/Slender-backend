import { join } from 'path';
import { readFile } from 'fs';

export default function handler(req, res) {
  const filePath = join(process.cwd(), 'api', 'blogData.json'); 
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading blogData.json:', err);
      res.status(500).json({ error: 'Unable to fetch blog posts' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
}
