<template>
  <section>
    <div class="header">
      <h2>Médicos</h2>
      <router-link class="new" :to="{ name: 'doctor-new' }">Nuevo</router-link>
    </div>
    <table class="table">
      <thead><tr><th>ID</th><th>Nombre</th><th>Especialidad</th><th></th></tr></thead>
      <tbody>
        <tr v-for="d in doctors" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.nombre }}</td>
          <td>{{ d.especialidad }}</td>
          <td><router-link :to="{ name: 'doctor-detail', params: { id: d.id } }">Ver</router-link></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { listDoctors } from '@/services/doctors.service';
import type { Doctor } from '@/models/doctor';

const doctors = ref<Doctor[]>([]);

onMounted(async () => {
  doctors.value = await listDoctors();
});
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.new { background: #2563eb; color: #fff; padding: .5rem .75rem; border-radius: 6px; text-decoration: none; }
.table { width: 100%; background: white; border-radius: 10px; overflow: hidden; border-collapse: collapse; margin-top: 1rem; }
th, td { padding: .75rem; border-bottom: 1px solid #f0f0f0; text-align: left; }
</style>
