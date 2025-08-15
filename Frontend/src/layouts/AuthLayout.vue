<template>
  <div class="auth-layout">
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f6f8fb;
}
.container {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
}
</style>
