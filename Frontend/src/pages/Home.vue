<template>
  <div class="hero-section font-sans text-white">
    <!-- Background Slideshow -->
    <div class="slideshow">
      <div class="slide slide1"></div>
      <div class="slide slide2"></div>
      <div class="slide slide3"></div>
    </div>

    <!-- Blue Overlay -->
    <div class="overlay"></div>

    <!-- Content -->
    <div class="hero-container">
      <div class="hero-text">
        <h1 class="hero-welcome animate-fade-in-up delay-1">Welcome To</h1>
        <h2 class="hero-title animate-fade-in-up delay-2">Ontario Tech Exam Scheduler!</h2>
        <p class="animate-fade-in-up delay-3">
          Add your exams to your calendar with ease!<br />
          Just search, click save, and export...
        </p>
        <router-link to="/search" class="animate-fade-in-up delay-4">
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
}

/* Slideshow Container */
.slideshow {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: slideShow 18s infinite;
}

.slide1 {
  background-image: url('../assets/OTU-background.jpg');
  animation-delay: 0s;
}
.slide2 {
  background-image: url('../assets/OTU-background2.jpg');
  animation-delay: 6s;
}
.slide3 {
  background-image: url('../assets/OTU-background3.jpg');
  animation-delay: 12s;
}

@keyframes slideShow {
  0% {
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  33% {
    opacity: 1;
  }
  41% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

/* Blue overlay filter */
.overlay {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 51, 102, 0.6);
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

/* Text animations */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}
.delay-2 {
  animation-delay: 0.4s;
}
.delay-3 {
  animation-delay: 0.6s;
}
.delay-4 {
  animation-delay: 0.8s;
}
</style>
