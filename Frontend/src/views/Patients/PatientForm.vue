<template>
  <section class="card">
    <h2>Nuevo paciente</h2>
    <form @submit.prevent="onSubmit" class="form">
      <BaseInput v-model="form.nombre" label="Nombre" required />
      <BaseInput v-model="form.apellido" label="Apellido" required />
      <BaseInput v-model="form.cedula" label="Cédula" required />
      <BaseInput v-model="form.email" label="Email" type="email" />
      <BaseInput v-model="form.telefono" label="Teléfono" />
      <div class="actions">
        <BaseButton type="submit">Guardar</BaseButton>
        <router-link to="/pacientes">Cancelar</router-link>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { createPatient } from '@/services/patients.service';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import type { Patient } from '@/models/patient';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive<Omit<Patient, 'id'>>({
  nombre: '', apellido: '', cedula: '', email: '', telefono: ''
});

async function onSubmit() {
  await createPatient(form);
  router.push('/pacientes');
}
</script>

<style scoped>
.card { background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.form { display: grid; gap: 1rem; max-width: 600px; }
.actions { display: flex; gap: 1rem; align-items: center; }
</style>
