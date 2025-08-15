<template>
  <div class="app-layout">
    <Sidebar />
    <div class="content">
      <Navbar />
      <main class="main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
</script>

<style scoped>
.app-layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
.content { display: flex; flex-direction: column; }
.main { padding: 1rem 1.5rem; background: #f9fafb; flex: 1; }
@media (max-width: 900px) {
  .app-layout { grid-template-columns: 1fr; }
}
</style>
