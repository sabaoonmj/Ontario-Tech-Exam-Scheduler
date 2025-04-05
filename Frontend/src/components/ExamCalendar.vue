<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <button @click="prevMonth">‹</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button @click="nextMonth">›</button>
    </div>
    <div ref="calendarContainer" class="calendar"></div>
    <div
  v-if="tooltip.visible"
  class="tooltip"
  :style="{ top: `${tooltip.y}px`, left: `${tooltip.x}px` }"
>
  {{ tooltip.text }}
</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import { useSavedExams } from '../composables/useSavedExams.js'

const { savedExams } = useSavedExams() // Assuming this fetches the saved exams data

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

// Dynamically populate events with the saved exams data
watch(savedExams, (newExams) => {
  events.value = newExams.map(exam => {
    const examDate = new Date(exam.date);
    const monthNumber = examDate.getMonth() + 1; // Month is 0-indexed, so we add 1
    const dayNumber = examDate.getDate();
    const year = currentYear.value; // Use the current year

    return {
      date: new Date(year, monthNumber - 1, dayNumber), // Set date using current year
      title: `${exam.course} Exam`, // Use course code + "Exam"
    };
  });
}, { immediate: true });


const tooltip = ref({ visible: false, x: 0, y: 0, text: '' })

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

  for (let i = 0; i < daysInMonth; i++) {
    const day = i + 1
    const col = (i + firstDay) % 7
    const row = Math.floor((i + firstDay) / 7) + 1

    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()

    const dateObj = new Date(year, month, day)
    const hasEvent = events.value.some(e => e.date.toDateString() === dateObj.toDateString())
    const eventText = events.value.find(e => e.date.toDateString() === dateObj.toDateString())?.title

    const cellGroup = group
      .append('g')
      .attr('cursor', hasEvent ? 'pointer' : 'default')
      .on('click', (event) => {
        if (hasEvent) {
          tooltip.value = {
            visible: true,
            x: event.pageX,
            y: event.pageY - 20,
            text: eventText
          }
        } else {
          tooltip.value.visible = false
        }
      })

    cellGroup
      .append('rect')
      .attr('x', col * cellSize)
      .attr('y', row * cellSize)
      .attr('width', cellSize - 10)
      .attr('height', cellSize - 10)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', isToday ? '#ffe082' : '#f5f5f5')
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
  tooltip.value.visible = false
}

function nextMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
  tooltip.value.visible = false
}

onMounted(drawCalendar)
watch(currentDate, drawCalendar)

</script>


<style scoped>
.previous-month{
  display: flex;
}
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

.calendar {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 12px;
}

.tooltip {
  position: absolute;
  background: #333;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1000;
  transform: translateX(-50%);
}
</style>