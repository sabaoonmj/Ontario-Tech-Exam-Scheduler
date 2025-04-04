require('dotenv').config();
const express = require('express');
const cors = require('cors');

const examRoutes = require('./routes/exams');
const studyRoutes = require('./routes/studySpots');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/exams', examRoutes);
app.use('/api/study-spots', studyRoutes);

module.exports = app;
