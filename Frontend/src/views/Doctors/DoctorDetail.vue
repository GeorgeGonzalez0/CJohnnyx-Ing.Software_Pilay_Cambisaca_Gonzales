<template>
  <section class="card" v-if="doctor">
    <header class="header">
      <h2>Médico #{{ doctor.id }}</h2>
      <div class="actions">
        <BaseButton @click="editing = !editing">{{ editing ? 'Cancelar' : 'Editar' }}</BaseButton>
        <BaseButton tone="danger" @click="onDelete">Eliminar</BaseButton>
      </div>
    </header>

    <div v-if="!editing" class="grid">
      <p><strong>Nombre:</strong> {{ doctor.nombre }}</p>
      <p><strong>Especialidad:</strong> {{ doctor.especialidad }}</p>
      <p><strong>Email:</strong> {{ doctor.email || '-' }}</p>
      <p><strong>Teléfono:</strong> {{ doctor.telefono || '-' }}</p>
    </div>

    <form v-else class="form" @submit.prevent="onUpdate">
      <BaseInput v-model="form.nombre" label="Nombre" required />
      <BaseInput v-model="form.especialidad" label="Especialidad" required />
      <BaseInput v-model="form.email" label="Email" type="email" />
      <BaseInput v-model="form.telefono" label="Teléfono" />
      <BaseButton type="submit">Guardar cambios</BaseButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDoctor, updateDoctor, deleteDoctor } from '@/services/doctors.service';
import type { Doctor } from '@/models/doctor';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const doctor = ref<Doctor | null>(null);
const editing = ref(false);
const form = reactive<Partial<Omit<Doctor, 'id'>>>({});

onMounted(async () => {
  doctor.value = await getDoctor(id);
  Object.assign(form, doctor.value);
});

async function onUpdate() {
  if (!doctor.value) return;
  const updated = await updateDoctor(doctor.value.id, form);
  doctor.value = updated;
  editing.value = false;
}

async function onDelete() {
  if (!doctor.value) return;
  await deleteDoctor(doctor.value.id);
  router.push('/medicos');
}
</script>

<style scoped>
.card { background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.grid { display: grid; gap: .5rem; }
.form { display: grid; gap: 1rem; max-width: 600px; }
.actions { display: flex; gap: .5rem; }
</style>
