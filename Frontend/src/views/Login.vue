<template>
  <AuthLayout>
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="onSubmit" class="form">
      <BaseInput v-model="username" label="Usuario" required autocomplete="username" />
      <BaseInput v-model="password" type="password" label="Contraseña" required autocomplete="current-password" />
      <BaseButton :loading="auth.loading" type="submit">Entrar</BaseButton>
      <p v-if="auth.error" class="error">{{ auth.error }}</p>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

const auth = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');

async function onSubmit() {
  await auth.login(username.value, password.value);
  router.push({ name: 'dashboard' });
}
</script>

<style scoped>
h1 { margin-bottom: 1rem; }
.form { display: grid; gap: 1rem; }
.error { color: #b00020; margin-top: .5rem; }
</style>
