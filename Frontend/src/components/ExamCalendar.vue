<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <button @click="prevMonth">‹</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button @click="nextMonth">›</button>
    </div>
    <div class="calendar-and-sidebar">
      <div ref="calendarContainer" class="calendar"></div>
      <div v-if="selectedDate" class="side-panel">
        <h3>Exams on {{ formattedSelectedDate }}</h3>
        <div v-if="selectedExams.length">
          <ul>
            <li v-for="(exam, index) in selectedExams" :key="index">
              <div class="exam-title">{{ exam.title }}</div>
              <div class="exam-start"><strong>Time:</strong> {{ exam.start }}</div>
              <div class="exam-room"><strong>Location:</strong> {{ exam.room }}</div>
              <!-- Add a button for each exam -->
              <button @click="importExamToGoogleCalendar(exam)">Import to Google Calendar</button>
            </li>
          </ul>
        </div>
        <div v-else>
          No exams scheduled for this day.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import * as d3 from 'd3'
import { useSavedExams } from '../composables/useSavedExams.js'

const { savedExams } = useSavedExams() // Fetch saved exams data

const calendarContainer = ref(null)
const currentDate = ref(new Date())
const today = new Date()

const width = 700
const height = 500
const cellSize = 80
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const monthName = computed(() =>
  currentDate.value.toLocaleString('default', { month: 'long' })
)

const events = ref([]) // Store event data for the calendar
const selectedDate = ref(null)
const selectedExams = ref([])

const formattedSelectedDate = computed(() =>
  selectedDate.value
    ? selectedDate.value.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''
)

// Map saved exams data to our events array
watch(savedExams, (newExams) => {
  events.value = newExams.map(exam => {
  const examDate = new Date(exam.date);
  const year = currentYear.value;
  return {
    date: new Date(year, examDate.getMonth(), examDate.getDate()),
    title: `${exam.course} Exam`,
    start: exam.start,
    duration: exam.duration,
    room: exam.room
  };
});

}, { immediate: true })

function drawCalendar() {
  const year = currentYear.value
  const month = currentMonth.value
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

 const totalRows = Math.ceil((daysInMonth + firstDay) / 7);
const calculatedHeight = totalRows * cellSize + 80; 

const svg = d3
  .select(calendarContainer.value)
  .html('')
  .append('svg')
  .attr('width', width)
  .attr('height', height + 100); // 💡 Increased height to prevent cutoff



  const group = svg.append('g').attr('transform', `translate(20, 40)`)

  // Weekday labels
  group
    .selectAll('text.day-label')
    .data(daysOfWeek)
    .enter()
    .append('text')
    .attr('x', (d, i) => i * cellSize + 20)
    .attr('y', 0)
    .text(d => d)
    .attr('font-size', '18px')
    .attr('fill', '#555')
    .attr('font-weight', 'bold')

  // Create each day cell
  for (let i = 0; i < daysInMonth; i++) {
    const day = i + 1
    const col = (i + firstDay) % 7
    const row = Math.floor((i + firstDay) / 7) + 1

    const dateObj = new Date(year, month, day)
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    const isSelected = selectedDate.value && dateObj.toDateString() === selectedDate.value.toDateString()
    const hasEvent = events.value.some(e => e.date.toDateString() === dateObj.toDateString())

    const cellGroup = group
      .append('g')
      .attr('cursor', hasEvent ? 'pointer' : 'default')
      .on('click', function(event) {
        selectedDate.value = dateObj
        selectedExams.value = events.value.filter(e => e.date.toDateString() === dateObj.toDateString())
      })

    cellGroup
      .append('rect')
      .attr('x', col * cellSize)
      .attr('y', row * cellSize)
      .attr('width', cellSize - 10)
      .attr('height', cellSize - 10)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', isSelected ? '#81c784' : (isToday ? '#ffe082' : '#f5f5f5'))
      .attr('stroke', '#ccc')

    cellGroup
      .append('text')
      .attr('x', col * cellSize + 15)
      .attr('y', row * cellSize + 30)
      .text(day)
      .attr('font-size', '18px')
      .attr('fill', '#333')

    if (hasEvent) {
      cellGroup
        .append('circle')
        .attr('cx', col * cellSize + 20)
        .attr('cy', row * cellSize + 50)
        .attr('r', 5)
        .attr('fill', '#f44336')
    }
  }
}

function prevMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
  selectedDate.value = null
  selectedExams.value = []
}

function nextMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
  selectedDate.value = null
  selectedExams.value = []
}

// Function for importing a specific exam to Google Calendar
function importExamToGoogleCalendar(exam) {
  console.log('Importing exam to Google Calendar...');

  if (!exam.start || !exam.duration) {
    console.error('Missing start time or duration for:', exam);
    return;
  }

  const startDateTime = convertToDate(exam.date, exam.start); // Updated to use exam.date
  const endDateTime = calculateEndTime(startDateTime, exam.duration);

  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    console.error('Invalid start or end date:', exam.start, exam.duration);
    return;
  }

  function calculateEndTime(startDate, duration) {
  const endDate = new Date(startDate);

  // Try to extract hours and minutes from duration string
  const hourMatch = duration.match(/(\d+)\s*hour/);
  const minuteMatch = duration.match(/(\d+)\s*min|minute/);
  const colonMatch = duration.match(/(\d+):(\d+)/); // e.g., "2:30"

  if (colonMatch) {
    endDate.setHours(endDate.getHours() + parseInt(colonMatch[1], 10));
    endDate.setMinutes(endDate.getMinutes() + parseInt(colonMatch[2], 10));
  } else {
    if (hourMatch) endDate.setHours(endDate.getHours() + parseInt(hourMatch[1], 10));
    if (minuteMatch) endDate.setMinutes(endDate.getMinutes() + parseInt(minuteMatch[1], 10));
  }

  return endDate;
}


  const formatDate = (date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(exam.title)}&dates=${formatDate(startDateTime)}/${formatDate(endDateTime)}&details=${encodeURIComponent(exam.title)}&location=${encodeURIComponent(exam.room)}&sf=true&output=xml`;

  window.open(googleCalendarURL, '_blank');
}


function convertTo24HourFormat(timeString) {
  const timeMap = {
    "Noon": "12:00",
    "Midnight": "00:00",
    "AM": "AM",
    "PM": "PM"
  };

  if (timeString.includes("p.m.") || timeString.includes("PM")) {
    let time = timeString.split(" ")[0];  // Extract the time part
    let [hours, minutes] = time.split(":");

    if (parseInt(hours) < 12) {
      hours = parseInt(hours) + 12; // Convert PM hours
    }
    return `${hours}:${minutes}`;
  } else if (timeString.includes("a.m.") || timeString.includes("AM")) {
    let time = timeString.split(" ")[0]; // Extract the time part
    let [hours, minutes] = time.split(":");
    
    if (parseInt(hours) === 12) {
      hours = "00";  // Convert 12 AM to 00
    }
    return `${hours}:${minutes}`;
  }

  // Handle "Noon" or "Midnight" specifically
  if (timeString === "Noon") return "12:00";
  if (timeString === "Midnight") return "00:00";

  return timeString;  // Return unchanged if it's a valid format
}

function convertToDate(examDate, examStart) {
  const timeString = convertTo24HourFormat(examStart);
  const [hours, minutes] = timeString.split(':');
  const date = new Date(examDate);
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(0);
  return date;
}



onMounted(drawCalendar)
watch(currentDate, drawCalendar)
watch(selectedDate, drawCalendar)
</script>

<style scoped>
.calendar {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
  overflow: visible;
  height: auto;
  display: inline-block;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  color: #333;

}

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
  font-family: 'Segoe UI', sans-serif;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: nowrap;
}

.calendar-header h2 {
  margin: 0;
  font-size: 28px;
  white-space: nowrap;
}


.calendar-header button {
  font-size: 28px;
  padding: 5px 15px;
  background-color: #eee;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.calendar-header button:hover {
  background-color: #ddd;
}

.calendar-and-sidebar {
  display: flex;
  align-items: flex-start;
}



/* Sidebar styling */
.side-panel {
  width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 1px solid #ddd;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed; /* Change from absolute to fixed */
  top: 80px; /* Offset from top to avoid overlap */
  right: 0;
  bottom: 0; /* Stretch to bottom */
  overflow-y: auto;
  z-index: 1001;
}

.side-panel h3 {
  margin-top: 0;
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 20px;
}


/* Exam title styling */
.exam-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

.exam-start,
.exam-room {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

li {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
}


/* Button for importing to Google Calendar */
button {
  background-color: #4285f4;
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 10px;
}

button:hover {
  background-color: #357ae8;
}

button:focus {
  outline: none;
}

button:active {
  background-color: #2a66c2;
}

/* Add a container for the import button outside of the side panel */
.import-button-container {
  padding: 20px;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.import-button-container button {
  background-color: #34a853;
  width: 80%;
  max-width: 250px;
}

.import-button-container button:hover {
  background-color: #2e8e47;
}

.import-button-container button:active {
  background-color: #267a3b;
}
</style>
