const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// This function scrapes the exam schedule from the Ontario Tech University website
async function scrapeExams(courseCodeFilter = null, crnFilter = null) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://registrar.ontariotechu.ca/registration/scheduling/exams/index.php', {
    waitUntil: 'networkidle2',
  });

  const content = await page.content();
  const $ = cheerio.load(content);

  const exams = [];
  const rows = $('table tr');

  rows.each((i, el) => {
    // Skip the first two rows and the last row 
    if (i < 2 || i === rows.length - 1) return;

    const row = $(el).find('td');
    if (row.length) {
      // Extract the data from each column, the indexes are based on the table from the website
      const exam = {
        semester: $(row[0]).text().trim(),
        course: $(row[1]).text().trim(),
        title: $(row[2]).text().trim(),
        crn: $(row[3]).text().trim(),
        instructor: $(row[4]).text().trim(),
        date: $(row[5]).text().trim(),
        start: $(row[6]).text().trim(),
        duration: $(row[7]).text().trim(),
        room: $(row[8]).text().trim(),
        location: $(row[9]).text().trim(),
        surname: $(row[10]).text().trim()
      };

      if (
        (!courseCodeFilter || exam.course.toLowerCase().includes(courseCodeFilter.toLowerCase())) &&
        (!crnFilter || exam.crn === crnFilter)
      ) {
        exams.push(exam);
      }
    }
  });

  await browser.close();
  return exams;
}

module.exports = scrapeExams;