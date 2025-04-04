const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080; // Change if needed

// Enable CORS to allow frontend access
app.use(cors());
app.use(express.json());

// Dummy Exam Data
const exams = [
  {
    id: 1, semester: "Winter 2024", course: "ENGR 1010U", title: "Engineering Basics",
    crn: "12345", instructor: "Dr. Smith", date: "April 20", start: "9:00 AM",
    duration: "3h", room: "A101", location: "Building A", surname: "Doe",
    seating: "Row 3", amendment: "None", notes: "Bring calculator"
  },
  {
    id: 2, semester: "Winter 2024", course: "MATH 1020U", title: "Calculus I",
    crn: "67890", instructor: "Prof. Brown", date: "April 22", start: "1:00 PM",
    duration: "2h", room: "B202", location: "Building B", surname: "Johnson",
    seating: "Row 1", amendment: "Extra time", notes: "Graphing calculator allowed"
  },
  {
    id: 3, semester: "Winter 2024", course: "COMP 2050U", title: "Programming Fundamentals",
    crn: "54321", instructor: "Dr. White", date: "April 25", start: "10:00 AM",
    duration: "2.5h", room: "C303", location: "Building C", surname: "Lee",
    seating: "Row 2", amendment: "None", notes: "No electronic devices allowed"
  }
];

// API Route to Get Exams
app.get("/api/exams", (req, res) => {
  res.json(exams);
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});