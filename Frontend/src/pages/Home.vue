<template>
  <div class="hero-section font-sans text-white">
    <!-- Hero Section -->
    <div class="hero-container">
      <!-- Centered Text -->
      <div class="hero-text">
        <h1 class="hero-welcome">Welcome To</h1>
        <h2 class="hero-title">Ontario Tech Exam Scheduler!</h2>
        <p>
          Add your exams to your calendar with ease!<br />
          Just search, click save, and export...
        </p>
        <router-link to="/search">
          <button class="btn-orange">GET STARTED</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 93.5vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-image: url('../assets/OTU-background.jpg');
  background-size: cover;
  background-position: center;
}

/* Blue overlay filter */
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 51, 102, 0.6); /* Navy blue with transparency */
  z-index: 1;
}

/* Main content above overlay */
.hero-container {
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 2rem;
}

.hero-text {
  max-width: 700px;
  color: white;
}

.hero-welcome {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.hero-text p {
  font-size: 1.8rem;
  color: #e5e5e5;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-orange {
  background-color: #f97316;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-orange:hover {
  background-color: #ea580c;
}
</style>
