<template>
  <label class="field">
    <span v-if="label" class="label">{{ label }}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      :required="required"
      :autocomplete="autocomplete"
      class="input"
    />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autocomplete?: string;
}>(), {
  type: 'text',
  placeholder: '',
  required: false,
  autocomplete: 'off'
});

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>();
const model = computed({
  get: () => props.modelValue as any,
  set: (v) => emit('update:modelValue', v)
});
</script>

<style scoped>
.field { display: grid; gap: .35rem; }
.label { font-size: .9rem; color: #374151; }
.input { padding: .6rem .75rem; border: 1px solid #e5e7eb; border-radius: 8px; outline: none; }
.input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }
</style>
