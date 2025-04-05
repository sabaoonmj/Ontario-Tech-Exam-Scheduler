<template>
  <div class="hero-section font-sans min-h-screen text-white">
    <!-- Hero Section -->
  <div class="hero-container">
      <!-- Left Side Text -->
      <div class="hero-text">
        <h1 class="hero-welcome">Welcome To</h1>
        <h2 class="hero-title">Ontario Tech Exam Scheduler!</h2>
        <p>
          Add your exams to your calendar with ease!<br />
          Just search, click add, and export...
        </p>
        <router-link to="/search">
          <button class="btn-orange">GET STARTED</button>
        </router-link>
      </div>

      <!-- Right Side Image -->
      <div class="hero-image">
        <img :src="handPencil" alt="Hand with pencil" />
      </div>
    </div>
  </div>
</template>

<script setup>
import handPencil from '../assets/OTU-background.png';
</script>

<style scoped>
.hero-section {
  background: linear-gradient(to bottom right, var(--spirit-navy), var(--dark-grey));
}

/* Layout */
.hero-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 3rem 6rem;
  gap: 3rem;
  flex-wrap: wrap;
}

.hero-text {
  max-width: 500px;
  color: white;
}

.hero-welcome {
  font-size: 2.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.8rem;
  color: white;
}

.hero-text p {
  font-size: 2.00rem;
  color: #e5e5e5;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-image img {
  max-width: 1000px;
  height: auto;
  margin-left: -90px;
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
