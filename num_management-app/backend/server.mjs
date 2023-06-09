import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint of the server!');
});

app.get('/numbers', async (req, res) => {
  let urls = req.query.url;

  // Handle the case when a single URL is provided as a string
  if (typeof urls === 'string') {
    urls = [urls];
  }

  console.log('urls:', urls); // Check the value of urls

  const numbers = new Set();

  const fetchNumbers = async (url) => {
    try {
      const response = await fetch(url, { timeout: 500 });
      if (response.ok) {
        const data = await response.json();
        data.numbers.forEach((number) => numbers.add(number));
      }
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  if (Array.isArray(urls)) {
    const promises = urls.map(fetchNumbers);
    await Promise.all(promises);

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    res.json({ numbers: sortedNumbers });
  } else {
    res.status(400).json({ error: 'Invalid URLs provided' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
