<template>
  <div class="saved-exams-page">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-center mb-6">My Saved Exams</h1>

    <!-- Exam list container -->
    <div v-if="savedExams.length" class="table-container mt-8">
      <table class="exam-table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Title</th>
            <th>CRN</th>
            <th>Instructor</th>
            <th>Date/Time</th>
            <th>Duration</th>
            <th>Room</th>
            <th>Location</th>
            <th>Surname</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exam in savedExams" :key="exam.crn">
            <td>{{ exam.semester }}</td>
            <td>{{ exam.course }}</td>
            <td>{{ exam.title }}</td>
            <td>{{ exam.crn }}</td>
            <td>{{ exam.instructor }}</td>
            <td>{{ exam.date }} at {{ exam.start }}</td>
            <td>{{ exam.duration }}</td>
            <td>{{ exam.room }}</td>
            <td>{{ exam.location }}</td>
            <td>{{ exam.surname }}</td>
            <td>
              <button @click="removeExam(exam.crn)" class="remove-button">
                <i class="fas fa-trash-alt"></i> <!-- Trash Icon -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="mt-8 text-center text-gray-500">You haven't saved any exams yet.</p>
  </div>
</template>

<script setup>
import { useSavedExams } from '../composables/useSavedExams.js';
const { savedExams, removeExam } = useSavedExams();
</script>

<style scoped>
.saved-exams-page {
  background: #f9f9f9;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 3rem;
}

/* Table Styling */
.table-container {
  overflow-x: auto;
}

.exam-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0px;
}

.exam-table th,
.exam-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.exam-table th {
  background-color: #0073e6;
  color: white;
  font-weight: bold;
}

.exam-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.exam-table tr:hover {
  background-color: #f1f1f1;
}

/* Button styles */
.remove-button {
  background-color: transparent;
  border: none;
  color: #f87171;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 6px 12px;
}

.remove-button:hover {
  color: #e53e3e;
}

.remove-button i {
  margin-right: 5px;
}
</style>
