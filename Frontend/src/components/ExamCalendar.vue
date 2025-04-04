<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  events: [
    { title: 'ENGR 1200 Exam', date: '2025-04-20' },
    { title: 'MATH 1010 Final', date: '2025-04-22' }
  ]
};
</script>
