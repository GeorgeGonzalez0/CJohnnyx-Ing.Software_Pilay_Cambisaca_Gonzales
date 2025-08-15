<template>
  <aside class="sidebar">
    <nav>
      <RouterLink to="/" exact-active-class="active">Dashboard</RouterLink>
      <RouterLink to="/pacientes" exact-active-class="active">Pacientes</RouterLink>
      <RouterLink to="/medicos" exact-active-class="active">Médicos</RouterLink>
      <RouterLink to="/citas" exact-active-class="active">Citas</RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.sidebar { background: #0f172a; color: #cbd5e1; padding: 1rem; }
nav { display: grid; gap: .5rem; }
a { color: #cbd5e1; text-decoration: none; padding: .5rem .75rem; border-radius: 8px; display: block; }
a.active, a:hover { background: #1e293b; color: white; }
</style>
