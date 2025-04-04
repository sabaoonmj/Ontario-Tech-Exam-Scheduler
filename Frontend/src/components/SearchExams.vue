<template>
  <div class="search-exams-page text-white min-h-screen">
    <!-- 🔷 Navbar from Home.vue -->
    <div class="navbar">
      <div class="navbar-logo">
        <img src="/vite.svg" alt="OT Logo" />
      </div>

      <div class="navbar-icons">
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/search"><i class="fas fa-search"></i></router-link>
        <router-link to="/calendar"><i class="fas fa-calendar-alt"></i></router-link>
        <router-link to="/contact"><i class="fas fa-envelope"></i></router-link>
      </div>

      <div>
        <router-link to="/exams">
          <button class="navbar-button">VIEW EXAMS</button>
        </router-link>
      </div>
    </div>

    <!-- 🔎 Exam Search UI -->
    <div class="content p-10">
      <h1 class="text-3xl font-bold mb-6">Search Exams</h1>

      <div class="flex gap-4 flex-wrap">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter course code or CRN"
          class="p-3 rounded-md w-full max-w-md text-black"
        />
        <button @click="searchExams" class="btn-orange">Search</button>
      </div>

      <!-- 📄 Results -->
      <div v-if="filteredExams.length" class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Results:</h2>
        <ul class="space-y-3">
          <li
            v-for="exam in filteredExams"
            :key="exam.id"
            class="bg-white text-black p-4 rounded shadow"
          >
            <strong>{{ exam.course }}</strong> - {{ exam.crn }}<br />
            Date: {{ exam.date }} | Time: {{ exam.time }}
          </li>
        </ul>
      </div>

      <div v-else class="mt-8 text-gray-300">No exams found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const exams = ref([
  { id: 1, course: 'ENGR 1010U', crn: '12345', date: 'April 20', time: '9:00 AM' },
  { id: 2, course: 'MATH 1020U', crn: '67890', date: 'April 22', time: '1:00 PM' },
  { id: 3, course: 'COMP 2050U', crn: '54321', date: 'April 25', time: '10:00 AM' }
]);

const filteredExams = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return exams.value.filter(
    exam =>
      exam.course.toLowerCase().includes(query) ||
      exam.crn.includes(query)
  );
});

function searchExams() {
  // Triggered on button click (optional if using v-model + computed)
}
</script>

<style scoped>
.search-exams-page {
  background: linear-gradient(to bottom right, var(--spirit-navy), var(--dark-grey));
}

.content input {
  border: 1px solid #ccc;
}
</style>
