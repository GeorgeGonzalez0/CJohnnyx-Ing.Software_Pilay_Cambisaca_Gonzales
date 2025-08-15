<template>
  <section>
    <h2>Panel general</h2>
    <div class="kpis">
      <div class="kpi"><strong>Pacientes</strong><span>{{ patientsCount }}</span></div>
      <div class="kpi"><strong>Médicos</strong><span>{{ doctorsCount }}</span></div>
      <div class="kpi"><strong>Citas (hoy)</strong><span>{{ todaysAppointments }}</span></div>
    </div>
    <AppointmentsChart :data="chartData" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { listPatients } from '@/services/patients.service';
import { listDoctors } from '@/services/doctors.service';
import { listAppointments } from '@/services/appointments.service';
import { todayISO } from '@/utils/dates';
import AppointmentsChart from '@/components/charts/AppointmentsChart.vue';

const patientsCount = ref(0);
const doctorsCount = ref(0);
const todaysAppointments = ref(0);
const chartData = ref<{ label: string; value: number }[]>([]);

onMounted(async () => {
  const [patients, doctors, appointments] = await Promise.all([
    listPatients(), listDoctors(), listAppointments({ fecha: todayISO() })
  ]);
  patientsCount.value = patients.length;
  doctorsCount.value = doctors.length;
  todaysAppointments.value = appointments.length;

  const byEstado: Record<string, number> = {};
  appointments.forEach(a => { byEstado[a.estado] = (byEstado[a.estado] || 0) + 1; });
  chartData.value = Object.entries(byEstado).map(([label, value]) => ({ label, value }));
});
</script>

<style scoped>
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1rem 0 2rem; }
.kpi { background: white; border-radius: 10px; padding: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,.06); display: flex; justify-content: space-between; align-items: center; }
</style>
