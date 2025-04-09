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
import { ref, computed, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import { useSavedExams } from '../composables/useSavedExams.js'

const { savedExams } = useSavedExams() // Fetches the saved exams data

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

// Reactive variable to store the calendar events dynamically
const events = ref([])

// New reactive variables for the selected date and its exams
const selectedDate = ref(null)
const selectedExams = ref([])

const formattedSelectedDate = computed(() =>
  selectedDate.value
    ? selectedDate.value.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''
)

// Map saved exams data to our events array using the current year.
// Now we use exam.start and exam.room
watch(savedExams, (newExams) => {
  events.value = newExams.map(exam => {
    const examDate = new Date(exam.date)
    const monthNumber = examDate.getMonth() + 1 // JavaScript month is 0-indexed, so add 1
    const dayNumber = examDate.getDate()
    const year = currentYear.value // Use the current year
    return {
      date: new Date(year, monthNumber - 1, dayNumber),
      title: `${exam.course} Exam`,
      start: exam.start,
      room: exam.room
    }
  })
}, { immediate: true })

function drawCalendar() {
  const year = currentYear.value
  const month = currentMonth.value
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const svg = d3
    .select(calendarContainer.value)
    .html('')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

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
        // Update the selected day and its exams (green highlight + side panel)
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
      // If the cell is selected, highlight it green; otherwise show today's or default color
      .attr('fill', isSelected ? '#81c784' : (isToday ? '#ffe082' : '#f5f5f5'))
      .attr('stroke', '#ccc')

    cellGroup
      .append('text')
      .attr('x', col * cellSize + 15)
      .attr('y', row * cellSize + 30)
      .text(day)
      .attr('font-size', '18px')
      .attr('fill', '#333')

    // Mark cell with a small circle if there's an event
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

onMounted(drawCalendar)
watch(currentDate, drawCalendar)
watch(selectedDate, drawCalendar)
</script>

<style scoped>
.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  font-family: 'Segoe UI', sans-serif;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.calendar-header h2 {
  margin: 0;
  font-size: 28px;
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

.calendar {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
}

.side-panel {
  margin-left: 20px;
  padding: 10px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 200px;
}

/* Remove dots from the exam list */
.side-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Optional: Style for individual exam details */
.side-panel li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.side-panel li:last-child {
  border-bottom: none;
}
</style>