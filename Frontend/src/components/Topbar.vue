<template>
  <div>
    <!-- Topbar -->
    <div
      class="topbar"
      :class="{ 'is-hovering': isHovering }"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <!-- Left: Logo -->
      <div class="navbar-logo">
        <img :src="logoURL" alt="OT Logo" />
      </div>

      <!-- Hamburger (mobile only) -->
      <div class="hamburger" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
      </div>

      <!-- Center Icons (desktop only) -->
      <div class="navbar-icons desktop-only">
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

      <!-- Right: Button (desktop only) -->
      <div class="navbar-button-wrap desktop-only">
        <router-link to="/exams">
          <button class="navbar-button">VIEW EXAMS</button>
        </router-link>
      </div>
    </div>

    <!-- Sidebar Drawer (mobile) -->
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <img :src="logoURL" alt="OT Logo" class="sidebar-logo" />
        <button @click="toggleSidebar" class="close-btn">&times;</button>
      </div>
      <router-link to="/" class="sidebar-link" @click="toggleSidebar">
        <i class="fas fa-home"></i> Home
      </router-link>
      <router-link to="/search" class="sidebar-link" @click="toggleSidebar">
        <i class="fas fa-search"></i> Search
      </router-link>
      <router-link to="/calendar" class="sidebar-link" @click="toggleSidebar">
        <i class="fas fa-calendar-alt"></i> Calendar
      </router-link>
      <router-link to="/contact" class="sidebar-link" @click="toggleSidebar">
        <i class="fas fa-envelope"></i> Contact
      </router-link>
      <router-link to="/exams" class="sidebar-link" @click="toggleSidebar">
        <button class="navbar-button">VIEW EXAMS</button>
      </router-link>
    </div>

    <!-- Backdrop -->
    <div class="sidebar-backdrop" v-if="sidebarOpen" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'
import logoURL from '../assets/logo.png'

const isHovering = ref(false)
const sidebarOpen = ref(false)

const emit = defineEmits(['updateTopbarHeight'])

watch(isHovering, (newValue) => {
  emit('updateTopbarHeight', newValue)
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
/* Topbar */
.topbar {
  background-color: var(--future-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: height 0.3s ease;
}

.topbar.is-hovering {
  height: 90px;
}

.navbar-logo img {
  height: 40px;
}

.hamburger {
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
}

/* Desktop only */
.desktop-only {
  display: flex;
}

.navbar-icons {
  display: flex;
  gap: 7rem;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
}

.icon-link i {
  font-size: 1.5rem;
}

.icon-label {
  font-size: 0.7rem;
  margin-top: 0.25rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.topbar.is-hovering .icon-label {
  opacity: 1;
  transform: translateY(0);
}

.topbar.is-hovering .icon-link {
  transform: scale(1.1);
}

.navbar-button {
  background-color: #f97316;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 1rem;
  transition: background 0.2s;
}

.navbar-button:hover {
  background-color: var(--primary-alt);
}

.router-link-exact-active {
  color:  #f97316;
}

.router-link-exact-active i {
  color:  #f97316;
}



/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: -260px;
  width: 260px;
  height: 100vh;
  background-color: var(--future-blue);
  color: white;
  padding: 1rem;
  z-index: 1100;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.sidebar.open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-logo {
  height: 40px;
}

.close-btn {
  font-size: 2rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
}

.sidebar-link i {
  font-size: 1.3rem;
}

.sidebar-link:hover {
  color: var(--tech-tangerine);
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1050;
}

/* Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .desktop-only {
    display: none;
  }
}
</style>
