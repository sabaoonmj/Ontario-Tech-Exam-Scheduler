<template>
  <div class="study-spots">
    <h2>Study Spots</h2>
    <ul>
      <li v-for="spot in studySpots" :key="spot.id">{{ spot.name }} - {{ spot.location }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studySpots: []
    };
  },
  methods: {
    fetchStudySpots() {
      // Fetch study spot data from the backend API
      axios.get('http://localhost:5000/api/studyspots')
        .then(response => {
          this.studySpots = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.fetchStudySpots();
  }
};
</script>

<style scoped>
.study-spots {
  padding: 1rem;
}
</style>
