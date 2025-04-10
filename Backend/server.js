const express = require("express");
const cors = require("cors");
const scrapeExams = require("./scrapers/examScraper");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

let exams = []; // Will store scraped exam data

// Scrape on server startup
(async () => {
  try {
    console.log("Scraping exam data...");
    exams = await scrapeExams();
    console.log(`Successfully Scraped ${exams.length} Exams`);
  } catch (error) {
    console.error("Error Scraping Exams:", error.message);
  }
})();

// Get all exams
app.get("/api/exams", (req, res) => {
  res.json(exams);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
