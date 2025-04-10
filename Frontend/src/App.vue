<template>
  <div class="app">
    <Topbar @updateTopbarHeight="updateTopbarHeight" />
    <div class="layout">
      <div class="main-content" :style="{ marginTop: topbarHeight }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Topbar from './components/Topbar.vue'

const topbarHeight = ref('60px') // Default height for topbar

// Update the height of the topbar if the user is hovering over it
const updateTopbarHeight = (isHovering) => {
  topbarHeight.value = isHovering ? '90px' : '60px'
}
</script>

<!-- CSS styles for the app -->
<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
  --topbar-height: 60px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  .layout {
    display: flex;
  }

  .main-content {
    flex: 1;
    padding: 0rem;
    transition: margin-top 0.3s ease;
  }
}
</style>
