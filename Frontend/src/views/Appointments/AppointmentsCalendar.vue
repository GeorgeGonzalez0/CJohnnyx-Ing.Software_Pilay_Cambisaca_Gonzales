<template>
  <section>
    <div class="header">
      <h2>Citas</h2>
      <router-link class="new" :to="{ name: 'appointment-new' }">Nueva</router-link>
    </div>
    <div class="filters">
      <input type="date" v-model="fecha" />
      <select v-model="estado">
        <option value="">Todas</option>
        <option value="pendiente">Pendiente</option>
        <option value="confirmada">Confirmada</option>
        <option value="cancelada">Cancelada</option>
        <option value="completada">Completada</option>
      </select>
    </div>
    <table class="table">
      <thead><tr><th>ID</th><th>Paciente</th><th>Médico</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
      <tbody>
        <tr v-for="a in appointments" :key="a.id">
          <td>{{ a.id }}</td>
          <td>#{{ a.paciente_id }}</td>
          <td>#{{ a.medico_id }}</td>
          <td>{{ formatDate(a.fecha) }}</td>
          <td>{{ a.estado }}</td>
          <td><router-link :to="{ name: 'appointment-detail', params: { id: a.id } }">Ver</router-link></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { listAppointments } from '@/services/appointments.service';
import type { Appointment } from '@/models/appointment';
import { humanDate } from '@/utils/dates';

const appointments = ref<Appointment[]>([]);
const fecha = ref<string>('');
const estado = ref<string>('');

watchEffect(async () => {
  appointments.value = await listAppointments({
    fecha: fecha.value || undefined,
    estado: estado.value || undefined
  });
});

function formatDate(iso: string) {
  return humanDate(iso);
}
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
.new { background: #2563eb; color: #fff; padding: .5rem .75rem; border-radius: 6px; text-decoration: none; }
.filters { display: flex; gap: .5rem; margin: 1rem 0; }
.table { width: 100%; background: white; border-radius: 10px; overflow: hidden; border-collapse: collapse; }
th, td { padding: .75rem; border-bottom: 1px solid #f0f0f0; text-align: left; }
</style>
