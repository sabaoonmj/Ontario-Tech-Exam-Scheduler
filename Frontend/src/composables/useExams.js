// src/composables/useExams.js
import { ref } from 'vue';

export const useExams = () => {
  const savedExams = ref([]);  // Holds saved exams

  // Function to add an exam to the savedExams
  const addExam = (exam) => {
    savedExams.value.push(exam);
  };

  // Function to remove an exam by its CRN
  const removeExam = (crn) => {
    savedExams.value = savedExams.value.filter(exam => exam.crn !== crn);
  };

  // Return the saved exams and functions
  return {
    savedExams,
    addExam,
    removeExam
  };
};
