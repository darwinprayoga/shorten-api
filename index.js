const express = require("express");
const app = express();
app.use(express.json());

// Store shortened URLs (for demo purposes)
const urlDatabase = {};

// Endpoint to receive and shorten URLs
app.post("/shorten", (req, res) => {
  const originalUrl = req.body.url;

  // Generate a short code (you can use various algorithms here)
  const shortCode = generateShortCode();

  // Save the original URL with the short code
  urlDatabase[shortCode] = originalUrl;

  // Construct the shortened URL
  const shortenedUrl = `http://yourdomain.com/${shortCode}`;

  res.json({ originalUrl, shortenedUrl });
});

// Redirect from short URL to original URL
app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;
  const originalUrl = urlDatabase[shortCode];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

// Helper function to generate short codes
function generateShortCode() {
  // Implement your own short code generation algorithm here
  return Math.random().toString(36).substring(2, 8);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
