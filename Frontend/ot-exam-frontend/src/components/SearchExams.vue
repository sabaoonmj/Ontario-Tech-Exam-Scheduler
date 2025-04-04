<template>
  <div class="search-form">
    <input v-model="searchQuery" type="text" placeholder="Search by Course Name or CRN" />
    <button @click="searchExams">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    searchExams() {
      // Emit search query to parent or call backend API
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
/* Add some basic styling */
.search-form {
  margin-bottom: 1rem;
}
.search-form input {
  padding: 0.5rem;
  margin-right: 1rem;
}
</style>
