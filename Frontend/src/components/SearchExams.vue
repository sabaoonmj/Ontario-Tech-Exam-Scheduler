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
              </tr>
            </thead>
            <tbody>
              <tr v-for="exam in filteredExams" :key="exam.id">
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
import { ref, computed } from 'vue';

const searchQuery = ref('');
const exams = ref([
  {
    id: 1, semester: 'Winter 2024', course: 'ENGR 1010U', title: 'Engineering Basics',
    crn: '12345', instructor: 'Dr. Smith', date: 'April 20', start: '9:00 AM',
    duration: '3h', room: 'A101', location: 'Building A', surname: 'Doe',
    seating: 'Row 3', amendment: 'None', notes: 'Bring calculator'
  },
  {
    id: 2, semester: 'Winter 2024', course: 'MATH 1020U', title: 'Calculus I',
    crn: '67890', instructor: 'Prof. Brown', date: 'April 22', start: '1:00 PM',
    duration: '2h', room: 'B202', location: 'Building B', surname: 'Johnson',
    seating: 'Row 1', amendment: 'Extra time', notes: 'Graphing calculator allowed'
  },
  {
    id: 3, semester: 'Winter 2024', course: 'COMP 2050U', title: 'Programming Fundamentals',
    crn: '54321', instructor: 'Dr. White', date: 'April 25', start: '10:00 AM',
    duration: '2.5h', room: 'C303', location: 'Building C', surname: 'Lee',
    seating: 'Row 2', amendment: 'None', notes: 'No electronic devices allowed'
  }
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
  // Search triggered (optional if using v-model + computed)
}
</script>

<style scoped>
/* Set white background */
.search-exams-page {
  background: white;
  min-height: 100vh;
  padding: 20px;
}

/* Center the search bar */
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

/* Style table */
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
</style>
