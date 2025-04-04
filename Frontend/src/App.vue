<template>
  <div class="app">
    <Topbar />
    <div class="layout">
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Topbar from './components/Topbar.vue'
</script>

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
    padding-top: var(--topbar-height); /* Make space for topbar */
  }

  .main-content {
    flex: 1;
    padding: 0rem;
  }
}
</style>
