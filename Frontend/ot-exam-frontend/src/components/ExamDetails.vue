<template>
  <div v-if="exam" class="exam-details">
    <h2>Exam Details</h2>
    <p><strong>Course:</strong> {{ exam.courseName }}</p>
    <p><strong>Professor:</strong> {{ exam.professor }}</p>
    <p><strong>Time:</strong> {{ exam.time }}</p>
    <p><strong>Location:</strong> {{ exam.location }}</p>
  </div>
</template>

<script>
export default {
  props: {
    exam: Object
  }
};
</script>

<style scoped>
.exam-details {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
}
</style>
