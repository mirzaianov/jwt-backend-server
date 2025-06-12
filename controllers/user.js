import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'db.json');

async function readFileAsync() {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    console.log('File content (async):');
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error reading file asynchronously:', err);
    return null;
  }
}

export default async function user(req, res) {
  try {
    // 1. Read the file asynchronously
    const fileContent = await readFileAsync();

    // 2. Parse the JSON data
    const jsonData = await JSON.parse(fileContent);

    // 4. Send a single, consolidated response
    res.json(jsonData);
  } catch (error) {
    console.error('Error processing user data request:', error); // Corrected console error message
    // Generic error for unexpected issues
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
