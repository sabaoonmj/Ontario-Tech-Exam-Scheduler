<template>
  <div class="topbar" :class="{'is-hovering': isHovering}" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <!-- Left: Logo -->
    <div class="navbar-logo">
      <img :src="logoURL" alt="OT Logo" />
    </div>

    <!-- Center: Icons -->
    <div class="navbar-icons">
      <router-link to="/" class="icon-link" exact>
        <i class="fas fa-home"></i>
        <span class="icon-label" v-if="isHovering">Home</span>
      </router-link>
      <router-link to="/search" class="icon-link">
        <i class="fas fa-search"></i>
        <span class="icon-label" v-if="isHovering">Search</span>
      </router-link>
      <router-link to="/calendar" class="icon-link">
        <i class="fas fa-calendar-alt"></i>
        <span class="icon-label" v-if="isHovering">Calendar</span>
      </router-link>
      <router-link to="/contact" class="icon-link">
        <i class="fas fa-envelope"></i>
        <span class="icon-label" v-if="isHovering">Contact</span>
      </router-link>
    </div>

    <!-- Right: View Exams Button -->
    <div class="navbar-button-wrap">
      <router-link to="/exams">
        <button class="navbar-button">VIEW EXAMS</button>
      </router-link>
    </div>
  </div>
</template>





<script setup>
import { ref } from 'vue'
import logoURL from '../assets/logo.png'

const isHovering = ref(false)
</script>




<style scoped>
.topbar {
  background-color: var(--future-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.topbar.is-hovering {
  height: 90px; /* The topbar expands when hovering */
}

.navbar-logo img {
  height: 40px;
}

/* Icons */
.navbar-icons {
  display: flex;
  gap: 8rem; /* Increase spacing between icons */
  align-items: center;
  justify-content: center;
  flex: 1;
  transition: all 0.3s ease;
}


.icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
  position: relative;
  transition: transform 0.3s ease; /* Smooth scaling of the icon */
}

.icon-link i {
  font-size: 1.5rem; /* Increase the size of the icon */
  transition: transform 0.3s ease;
}

.icon-link .icon-label {
  font-size: 0.7rem;
  margin-top: 0.25rem;
  opacity: 0;
  transform: translateY(10px); /* Make it start a bit below */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Smooth label transition */
}

/* Show the label and scale icon when hovering */
.topbar.is-hovering .icon-link .icon-label {
  opacity: 1;
  transform: translateY(0); /* Move the label up when it appears */
}

.topbar.is-hovering .icon-link {
  transform: scale(1.1); /* Scale up the icon when hovering */
}

.topbar.is-hovering .icon-link i {
  transform: scale(1.2); /* Scale up the icon a little more on hover */
}

/* Hover effect on icons */
.icon-link:hover,
.icon-link.router-link-exact-active {
  color: var(--tech-tangerine);
}

.icon-link.router-link-exact-active i {
  color: var(--tech-tangerine);
}

.navbar-button-wrap {
  display: flex;
  align-items: center;
}

.navbar-button {
  background-color: #f97316;
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


