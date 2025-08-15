<template>
  <section>
    <div class="header">
      <h2>Pacientes</h2>
      <router-link class="new" :to="{ name: 'patient-new' }">Nuevo</router-link>
    </div>
    <input v-model="q" placeholder="Buscar por nombre o cédula" class="search" />
    <table class="table">
      <thead><tr><th>ID</th><th>Nombre</th><th>Cédula</th><th>Contacto</th><th></th></tr></thead>
      <tbody>
        <tr v-for="p in filtered" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }} {{ p.apellido }}</td>
          <td>{{ p.cedula }}</td>
          <td>{{ p.email || '-' }}</td>
          <td>
            <router-link :to="{ name: 'patient-detail', params: { id: p.id } }">Ver</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { listPatients } from '@/services/patients.service';
import type { Patient } from '@/models/patient';

const q = ref('');
const patients = ref<Patient[]>([]);

onMounted(async () => {
  patients.value = await listPatients();
});

const filtered = computed(() => {
  const term = q.value.toLowerCase();
  return patients.value.filter(p =>
    [p.nombre, p.apellido, p.cedula, p.email].filter(Boolean).some(v => String(v).toLowerCase().includes(term))
  );
});
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.new { background: #2563eb; color: #fff; padding: .5rem .75rem; border-radius: 6px; text-decoration: none; }
.search { margin: 1rem 0; padding: .5rem .75rem; width: 100%; max-width: 420px; }
.table { width: 100%; background: white; border-radius: 10px; overflow: hidden; border-collapse: collapse; }
th, td { padding: .75rem; border-bottom: 1px solid #f0f0f0; text-align: left; }
</style>
