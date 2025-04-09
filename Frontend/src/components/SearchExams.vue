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
      </div>

      <!-- 📄 Results Block -->
      <div v-if="filteredExams.length" class="mt-8">
        <h2 class="text-xl font-semibold mb-4 text-center">Results:</h2>

        <!-- Table for PC -->
        <div class="table-container" v-if="!isMobile">
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
                <th>Actions</th>
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
                <td>
                  <button @click="handleAddExam(exam)" class="save-button">Save</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Grid Layout for Mobile -->
        <div class="exam-block-container" v-else>
          <div v-for="exam in filteredExams" :key="exam.id" class="exam-block">
            <div class="exam-detail">
              <strong>Semester:</strong> {{ exam.semester }}
            </div>
            <div class="exam-detail">
              <strong>Course:</strong> {{ exam.course }}
            </div>
            <div class="exam-detail">
              <strong>Title:</strong> {{ exam.title }}
            </div>
            <div class="exam-detail">
              <strong>CRN:</strong> {{ exam.crn }}
            </div>
            <div class="exam-detail">
              <strong>Instructor:</strong> {{ exam.instructor }}
            </div>
            <div class="exam-detail">
              <strong>Date:</strong> {{ exam.date }}
            </div>
            <div class="exam-detail">
              <strong>Start:</strong> {{ exam.start }}
            </div>
            <div class="exam-detail">
              <strong>Duration:</strong> {{ exam.duration }}
            </div>
            <div class="exam-detail">
              <strong>Room:</strong> {{ exam.room }}
            </div>
            <div class="exam-detail">
              <strong>Location:</strong> {{ exam.location }}
            </div>
            <div class="exam-detail">
              <strong>Surname:</strong> {{ exam.surname }}
            </div>
            <button @click="handleAddExam(exam)" class="save-button">Save</button>
          </div>
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
import $ from 'jquery';
window.$ = window.jQuery = $; // Ensure global jQuery support
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

const isMobile = ref(false)

onMounted(() => {
  const checkScreen = () => {
    isMobile.value = window.innerWidth < 768
  }
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
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

/* Grid layout for mobile */
.exam-block-container {
  display: block;
}

.exam-block {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
  max-width: 400px;
}

.exam-detail {
  margin-bottom: 10px;
}

/* Mobile Styles */
@media (max-width: 768px) {
/* By default, hide exam block on large screens */
.exam-block-container {
  display: none;
}

/* Show table on larger screens */
.table-container {
  display: block;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .table-container {
    display: none; /* Hide table on mobile */
  }

  .exam-block-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .exam-block {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 20px;
    max-width: 400px;
    width: 100%;
  }

  .exam-block strong {
    color: #0078c1;
    font-weight: bold;
  }
}

}

</style>
