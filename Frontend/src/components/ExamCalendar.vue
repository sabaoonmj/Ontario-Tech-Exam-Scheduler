<template>
  <div class="calendar-wrapper">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  height: 'auto', // makes calendar shrink to fit content
  contentHeight: 600, // limits vertical size on larger screens
  events: [
    { title: 'ENGR 1200 Exam', date: '2025-04-20' },
    { title: 'MATH 1010 Final', date: '2025-04-22' }
  ]
};
</script>

<style scoped>
.calendar-wrapper {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

@media (max-width: 768px) {
  .calendar-wrapper {
    padding: 0.5rem;
    max-width: 95%;
  }
}
</style>
