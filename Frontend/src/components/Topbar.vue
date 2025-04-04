<template>
  <div class="topbar">
    <!-- Left: Logo -->
    <div class="navbar-logo">
      <img :src="logoURL" alt="OT Logo" />
    </div>

    <!-- Center: Icons -->
      <div class="navbar-icons">
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/search"><i class="fas fa-search"></i></router-link>
        <router-link to="/calendar"><i class="fas fa-calendar-alt"></i></router-link>
        <router-link to="/contact"><i class="fas fa-envelope"></i></router-link>
      </div>

    <!-- Right: View Exams Button -->
    <div>
      <router-link to="/exams">
        <button class="navbar-button">VIEW EXAMS</button>
      </router-link>
    </div>
  </div>
</template>


<script setup>
import logoURL from '../assets/logo.png'
</script>

<style scoped>
.topbar {
  height: 60px;
  background-color: var(--dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  left: 100px; 
  right: 0;
  z-index: 1000;
}

/* Logo */
.navbar-logo img {
  height: 40px;
}

/* Title */
.navbar-title {
  flex: 1;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  pointer-events: none;
}

/* Button */
.navbar-button {
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.2s;
}

.navbar-button:hover {
  background-color: var(--primary-alt);
}
</style>

