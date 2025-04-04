import { ref, watch } from 'vue';

const savedExams = ref(JSON.parse(localStorage.getItem('savedExams') || '[]'));

watch(savedExams, (newVal) => {
  localStorage.setItem('savedExams', JSON.stringify(newVal));
}, { deep: true });

function addExam(exam) {
  if (!savedExams.value.some(e => e.crn === exam.crn)) {
    savedExams.value.push(exam);
  }
}

function removeExam(crn) {
  savedExams.value = savedExams.value.filter(e => e.crn !== crn);
}

export function useSavedExams() {
  return { savedExams, addExam, removeExam };
}
