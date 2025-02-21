const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/cut', async (req, res) => {
 const urlToShorten = req.query.url;
 if (!urlToShorten) {
  return res.status(400).json({ error: 'URL parameter is required' });
 }
 try {
  const response = await axios.post('https://acut0x.onrender.com/', `url=${encodeURIComponent(urlToShorten)}`, {
  headers: {
   'Content-Type': 'application/x-www-form-urlencoded'
  }
 });
 const $ = cheerio.load(response.data);
 const shortenedLink = $('a.acortada').attr('href');
 if (!shortenedLink) {
  return res.status(500).json({ error: 'Failed to extract shortened link' });
 }
 res.json({ link: shortenedLink });
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'An error occurred while shortening the URL' });
  }
});

app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
});
