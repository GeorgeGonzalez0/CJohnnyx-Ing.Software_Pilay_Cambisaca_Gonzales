<template>
  <header class="navbar">
    <h1 class="title">Sistema de Gestión Médica</h1>
    <button class="logout" @click="logout">Salir</button>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const auth = useAuthStore();
const router = useRouter();
function logout() {
  auth.logout();
  router.push('/login');
}
</script>

<style scoped>
.navbar { height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; background: white; border-bottom: 1px solid #eee; }
.title { font-size: 1.1rem; }
.logout { background: #ef4444; color: white; border: none; border-radius: 8px; padding: .5rem .75rem; cursor: pointer; }
</style>
