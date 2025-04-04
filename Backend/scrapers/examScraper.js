const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeExams(courseCodeFilter = null, crnFilter = null) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://registrar.ontariotechu.ca/registration/scheduling/exams/index.php', {
    waitUntil: 'networkidle2',
  });

  const content = await page.content();
  const $ = cheerio.load(content);

  const exams = [];

  $('table tr').each((i, el) => {
    // Skip the first two rows
    if (i < 2) return;
    const row = $(el).find('td');


    if (row.length) {
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
