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
              <tr v-for="exam in filteredExams" :key="exam.id" :class="{ 'saved-row': isSaved(exam) }">
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
                  <button @click="handleAddExam(exam)" class="save-button">Save</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="mt-8 text-center text-gray-500">No exams found.</div>
    </div>

    <!-- Notification -->
    <div v-if="notificationVisible" class="notification">
      <p>{{ notificationMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import $ from 'jquery'; // Import jQuery
import { useSavedExams } from '../composables/useSavedExams.js';

// Declare reactive variables for the search query and exams list
const { addExam, savedExams } = useSavedExams();

const isSaved = (exam) => {
  return savedExams.value.some(e => isSameExam(e, exam));
};

const isSameExam = (a, b) => {
  return (
    a.course === b.course &&
    a.room === b.room &&
    a.instructor === b.instructor &&
    a.surname === b.surname &&
    a.crn === b.crn
  );
};

const searchQuery = ref('');
const exams = ref([]);

// Notification states
const notificationVisible = ref(false);
const notificationMessage = ref('');

// Function to fetch exams using AJAX (with jQuery)
const fetchExams = () => {
  $.ajax({
    url: 'http://localhost:8080/api/exams', // The backend API endpoint
    type: 'GET', // Method type
    success: function(data) {
      exams.value = data; // Assign fetched data to exams
    },
    error: function(error) {
      console.error('Error fetching exams:', error);
    }
  });
};

// Fetch exams when the component is mounted
onMounted(() => {
  fetchExams();
});

// Computed property to filter exams based on the search query
const filteredExams = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return exams.value.filter(
    exam =>
      exam.course.toLowerCase().includes(query) ||
      exam.crn.includes(query)
  );
});

// Optional manual trigger function for searching exams
function searchExams() {
  // This could be tied to an event if you want manual triggering.
}

// Function to handle saving an exam and showing the notification
function handleAddExam(exam) {
  addExam(exam); // Save the exam
  notificationMessage.value = `You have added the exam "${exam.title}" to your saved exams. Good Luck with your exams!`; 
  notificationVisible.value = true; // Show the notification

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notificationVisible.value = false;
  }, 3000);
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

.saved-row {
  background-color: #d4edda !important; /* light green */
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

/* Notification styles */
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
}
</style>
