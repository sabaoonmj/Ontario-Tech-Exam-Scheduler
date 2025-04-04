<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">My Saved Exams</h2>

    <ul v-if="savedExams.length" class="space-y-4">
      <li
        v-for="exam in savedExams"
        :key="exam.crn"
        class="bg-gray-100 p-4 rounded shadow-sm"
      >
        <p class="font-semibold">{{ exam.course }} – {{ exam.title }}</p>
        <p class="text-gray-600">CRN: {{ exam.crn }}</p>
        <p class="text-gray-600">{{ exam.date }} at {{ exam.start }}</p>
        <p class="text-gray-600">Room: {{ exam.room }} – {{ exam.location }}</p>
        <button
          @click="removeExam(exam.crn)"
          class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </li>
    </ul>

    <p v-else class="text-gray-500">You haven't saved any exams yet.</p>
  </div>
</template>

<script setup>
import { useSavedExams } from '../composables/useSavedExams.js';
const { savedExams, removeExam } = useSavedExams();
</script>
