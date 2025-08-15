<template>
  <section class="card" v-if="appointment">
    <header class="header">
      <h2>Cita #{{ appointment.id }}</h2>
      <div class="actions">
        <BaseButton @click="editing = !editing">{{ editing ? 'Cancelar' : 'Editar' }}</BaseButton>
        <BaseButton tone="danger" @click="onDelete">Eliminar</BaseButton>
      </div>
    </header>

    <div v-if="!editing" class="grid">
      <p><strong>Paciente:</strong> #{{ appointment.paciente_id }}</p>
      <p><strong>Médico:</strong> #{{ appointment.medico_id }}</p>
      <p><strong>Fecha:</strong> {{ humanDate(appointment.fecha) }}</p>
      <p><strong>Estado:</strong> {{ appointment.estado }}</p>
      <p><strong>Notas:</strong> {{ appointment.notas || '-' }}</p>
    </div>

    <form v-else class="form" @submit.prevent="onUpdate">
      <BaseInput v-model.number="form.paciente_id" label="ID Paciente" type="number" required />
      <BaseInput v-model.number="form.medico_id" label="ID Médico" type="number" required />
      <BaseInput v-model="form.fecha" label="Fecha" type="datetime-local" required />
      <BaseSelect v-model="form.estado" label="Estado" :options="estados" />
      <BaseInput v-model="form.notas" label="Notas" />
      <BaseButton type="submit">Guardar cambios</BaseButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAppointment, updateAppointment, deleteAppointment } from '@/services/appointments.service';
import type { Appointment, AppointmentStatus } from '@/models/appointment';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import { humanDate } from '@/utils/dates';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const appointment = ref<Appointment | null>(null);
const editing = ref(false);
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

onMounted(async () => {
  const data = await getAppointment(id);
  appointment.value = data;
  Object.assign(form, data);
});

async function onUpdate() {
  if (!appointment.value) return;
  if (!form.fecha.endsWith('Z')) form.fecha = new Date(form.fecha).toISOString();
  appointment.value = await updateAppointment(appointment.value.id, form);
  editing.value = false;
}

async function onDelete() {
  if (!appointment.value) return;
  await deleteAppointment(appointment.value.id);
  router.push('/citas');
}
</script>

<style scoped>
.card { background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.grid { display: grid; gap: .5rem; }
.form { display: grid; gap: 1rem; max-width: 600px; }
.actions { display: flex; gap: .5rem; }
</style>
