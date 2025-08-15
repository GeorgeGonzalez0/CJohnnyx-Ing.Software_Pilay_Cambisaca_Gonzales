<template>
  <label class="field">
    <span v-if="label" class="label">{{ label }}</span>
    <select class="select" v-model="model">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: string | number;
  label?: string;
  options: { label: string; value: string | number }[];
}>();
const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>();

const model = computed({
  get: () => props.modelValue as any,
  set: (v) => emit('update:modelValue', v)
});
</script>

<style scoped>
.field { display: grid; gap: .35rem; }
.label { font-size: .9rem; color: #374151; }
.select { padding: .6rem .75rem; border: 1px solid #e5e7eb; border-radius: 8px; outline: none; background: white; }
.select:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }
</style>
