<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="btn"
    :class="[`tone-${tone}`, { loading }]"
    @click="$emit('click')"
  >
    <span v-if="loading" class="spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  tone?: 'primary' | 'danger' | 'neutral';
}>();
withDefaults(defineProps(), {
  type: 'button',
  disabled: false,
  loading: false,
  tone: 'primary'
});
</script>

<style scoped>
.btn { padding: .6rem .9rem; border-radius: 8px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: .5rem; }
.tone-primary { background: #2563eb; color: white; }
.tone-danger { background: #ef4444; color: white; }
.tone-neutral { background: #e5e7eb; color: #111827; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.4); border-top-color: white; border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
