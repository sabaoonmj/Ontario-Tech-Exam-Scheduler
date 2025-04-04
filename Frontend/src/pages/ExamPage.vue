<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">All Upcoming Exams</h2>
      <ul class="space-y-4">
        <li v-for="exam in exams" :key="exam.crn" class="bg-gray-100 p-4 rounded">
          <p><strong>{{ exam.name }}</strong> (CRN: {{ exam.crn }})</p>
          <p>{{ exam.date }} at {{ exam.time }} - {{ exam.location }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const exams = ref([
    { crn: '12345', name: 'ENGR 1200', date: '2025-04-20', time: '10:00 AM', location: 'Room 101' },
    { crn: '67890', name: 'MATH 1010', date: '2025-04-22', time: '2:00 PM', location: 'Room 205' }
  ]);
  </script>