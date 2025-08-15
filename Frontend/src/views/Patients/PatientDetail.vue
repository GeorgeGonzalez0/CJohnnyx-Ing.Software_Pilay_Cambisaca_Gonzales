<template>
  <section class="card" v-if="patient">
    <header class="header">
      <h2>Paciente #{{ patient.id }}</h2>
      <div class="actions">
        <BaseButton @click="editing = !editing">{{ editing ? 'Cancelar' : 'Editar' }}</BaseButton>
        <BaseButton tone="danger" @click="onDelete">Eliminar</BaseButton>
      </div>
    </header>

    <div v-if="!editing" class="grid">
      <p><strong>Nombre:</strong> {{ patient.nombre }} {{ patient.apellido }}</p>
      <p><strong>Cédula:</strong> {{ patient.cedula }}</p>
      <p><strong>Email:</strong> {{ patient.email || '-' }}</p>
      <p><strong>Teléfono:</strong> {{ patient.telefono || '-' }}</p>
    </div>

    <form v-else class="form" @submit.prevent="onUpdate">
      <BaseInput v-model="form.nombre" label="Nombre" required />
      <BaseInput v-model="form.apellido" label="Apellido" required />
      <BaseInput v-model="form.cedula" label="Cédula" required />
      <BaseInput v-model="form.email" label="Email" type="email" />
      <BaseInput v-model="form.telefono" label="Teléfono" />
      <BaseButton type="submit">Guardar cambios</BaseButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPatient, updatePatient, deletePatient } from '@/services/patients.service';
import type { Patient } from '@/models/patient';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const patient = ref<Patient | null>(null);
const editing = ref(false);
const form = reactive<Partial<Omit<Patient, 'id'>>>({});

onMounted(async () => {
  patient.value = await getPatient(id);
  Object.assign(form, patient.value);
});

watch(editing, (val) => {
  if (val && patient.value) Object.assign(form, patient.value);
});

async function onUpdate() {
  if (!patient.value) return;
  const updated = await updatePatient(patient.value.id, form);
  patient.value = updated;
  editing.value = false;
}

async function onDelete() {
  if (!patient.value) return;
  await deletePatient(patient.value.id);
  router.push('/pacientes');
}
</script>

<style scoped>
.card { background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.grid { display: grid; gap: .5rem; }
.form { display: grid; gap: 1rem; max-width: 600px; }
.actions { display: flex; gap: .5rem; }
</style>
