<template>
  <section class="card">
    <h2>Nueva cita</h2>
    <form @submit.prevent="onSubmit" class="form">
      <BaseInput v-model.number="form.paciente_id" label="ID Paciente" type="number" required />
      <BaseInput v-model.number="form.medico_id" label="ID Médico" type="number" required />
      <BaseInput v-model="form.fecha" label="Fecha" type="datetime-local" required />
      <BaseSelect v-model="form.estado" label="Estado" :options="estados" />
      <BaseInput v-model="form.notas" label="Notas" />
      <div class="actions">
        <BaseButton type="submit">Guardar</BaseButton>
        <router-link to="/citas">Cancelar</router-link>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import { createAppointment } from '@/services/appointments.service';
import type { Appointment, AppointmentStatus } from '@/models/appointment';
import { useRouter } from 'vue-router';

const router = useRouter();
const estados = [
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'Confirmada', value: 'confirmada' },
  { label: 'Cancelada', value: 'cancelada' },
  { label: 'Completada', value: 'completada' }
];

const form = reactive<Omit<Appointment, 'id'>>({
  paciente_id: 0,
  medico_id: 0,
  fecha: new Date().toISOString(),
  estado: 'pendiente' as AppointmentStatus,
  notas: ''
});

async function onSubmit() {
  // Convertir datetime-local a ISO si aplica
  if (!form.fecha.endsWith('Z')) {
    const dt = new Date(form.fecha);
    form.fecha = dt.toISOString();
  }
  await createAppointment(form);
  router.push('/citas');
}
</script>

<style scoped>
.card { background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.form { display: grid; gap: 1rem; max-width: 600px; }
.actions { display: flex; gap: 1rem; align-items: center; }
</style>
