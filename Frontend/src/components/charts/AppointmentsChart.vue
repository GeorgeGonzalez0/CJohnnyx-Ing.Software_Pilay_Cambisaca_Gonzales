<template>
  <div class="chart">
    <div class="bar" v-for="d in data" :key="d.label" :style="{ height: `${scale(d.value)}%` }" :title="`${d.label}: ${d.value}`">
      <span class="value">{{ d.value }}</span>
      <span class="label">{{ d.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ data: { label: string; value: number }[] }>();

function scale(v: number) {
  const max = Math.max(1, ...props.data.map(d => d.value));
  return (v / max) * 100;
}
</script>

<style scoped>
.chart { display: grid; grid-auto-flow: column; gap: .75rem; align-items: end; height: 180px; background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.bar { background: #93c5fd; border-radius: 8px 8px 0 0; width: 60px; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; position: relative; }
.value { position: absolute; top: -1.5rem; font-size: .8rem; color: #111827; }
.label { padding: .25rem 0; font-size: .8rem; }
</style>
