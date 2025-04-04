const express = require("express");
const cors = require("cors");
const scrapeExams = require("./scrapers/examScraper"); // adjust if file is elsewhere

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

let exams = []; // will store scraped exam data

// Scrape on server startup
(async () => {
  try {
    console.log("Scraping exam data...");
    exams = await scrapeExams(); // no filters
    console.log(`✅ Scraped ${exams.length} exams`);
  } catch (error) {
    console.error("❌ Error scraping exams:", error.message);
  }
})();

// Get all exams
app.get("/api/exams", (req, res) => {
  res.json(exams);
});

// Search exams by courseCode or CRN (optional)
app.get("/api/exams/search", async (req, res) => {
  const { courseCode, crn } = req.query;

  try {
    const filteredExams = await scrapeExams(courseCode, crn);
    res.json(filteredExams);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
