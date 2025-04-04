<template>
  <div class="search-exams-page">
    <!-- 🔎 Exam Search UI -->
    <div class="content">
      <h1 class="text-3xl font-bold text-center mb-6">Search Exams</h1>

      <!-- Centered Search Bar -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter course code or CRN"
          class="search-input"
        />
        <button @click="searchExams" class="search-button">Search</button>
      </div>

      <!-- 📄 Results Table -->
      <div v-if="filteredExams.length" class="mt-8">
        <h2 class="text-xl font-semibold mb-4 text-center">Results:</h2>
        <div class="table-container">
          <table class="exam-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course</th>
                <th>Title</th>
                <th>CRN</th>
                <th>Instructor</th>
                <th>Date</th>
                <th>Start</th>
                <th>Duration</th>
                <th>Room</th>
                <th>Location</th>
                <th>Surname</th>
                <th>Seating</th>
                <th>Amendment</th>
                <th>Notes</th>
                <th>Save</th> <!-- 💾 New header column -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="exam in filteredExams" :key="exam.crn">
                <td>{{ exam.semester }}</td>
                <td>{{ exam.course }}</td>
                <td>{{ exam.title }}</td>
                <td>{{ exam.crn }}</td>
                <td>{{ exam.instructor }}</td>
                <td>{{ exam.date }}</td>
                <td>{{ exam.start }}</td>
                <td>{{ exam.duration }}</td>
                <td>{{ exam.room }}</td>
                <td>{{ exam.location }}</td>
                <td>{{ exam.surname }}</td>
                <td>{{ exam.seating }}</td>
                <td>{{ exam.amendment }}</td>
                <td>{{ exam.notes }}</td>
                <td>
                  <button @click="addExam(exam)" class="save-button">
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="mt-8 text-center text-gray-500">No exams found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSavedExams } from '../composables/useSavedExams.js';


const { addExam } = useSavedExams();
const searchQuery = ref('');
const exams = ref([]);

const fetchExams = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/exams');
    if (!response.ok) throw new Error('Failed to fetch exams');
    exams.value = await response.json();
  } catch (error) {
    console.error('Error fetching exams:', error);
  }
};

onMounted(() => {
  fetchExams();
});

const filteredExams = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return exams.value.filter(
    exam =>
      exam.course.toLowerCase().includes(query) ||
      exam.crn.includes(query)
  );
});

function searchExams() {
  // Optional manual trigger
}
</script>

<style scoped>
.search-exams-page {
  background: white;
  min-height: 100vh;
  padding: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  padding: 10px 15px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #e64a19;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.exam-table {
  width: 100%;
  border-collapse: collapse;
}

.exam-table th,
.exam-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.exam-table th {
  background-color: #0073e6;
  color: white;
  font-weight: bold;
}

.exam-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.exam-table tr:hover {
  background-color: #ddd;
}

.save-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}
</style>
