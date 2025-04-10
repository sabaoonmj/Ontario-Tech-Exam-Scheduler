<template>
  <div class="saved-exams-page">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-center mb-6">My Saved Exams</h1>


    <div v-if="savedExams.length" class="mt-8">
      <!-- Table for PC -->
      <div class="table-container" v-if="!isMobile" >
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

      <!-- Grid Layout for Mobile -->
      <div class="exam-block-container" v-else>
        <div v-for="exam in savedExams" :key="exam.crn" class="exam-block">
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
          <button @click="removeExam(exam.crn)" class="remove-button">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
        </div>
      </div>
    </div>

    <!-- No exams saved message -->
    <p v-if="savedExams.length === 0" class="mt-8 text-center text-gray-500">
      You haven't saved any exams yet.
    </p>
  </div>
</template>

<script setup>
import { useSavedExams } from '../composables/useSavedExams.js';
import { ref, onMounted } from 'vue';

const { savedExams, removeExam } = useSavedExams();

// Ref to determine if the device is mobile
const isMobile = ref(false);

// Check the screen size on component mount
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// Listen for window resizing to adjust screen size
onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});
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

/* Media Query for Mobile */
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

  .remove-button {
    font-size: 1rem;
    padding: 6px 10px;
  }

  .exam-block strong {
    color: #0078c1;
    font-weight: bold;
  }

}
</style>
