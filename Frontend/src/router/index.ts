import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { requireAuth } from './guards';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/Dashboard.vue') },
      { path: 'pacientes', name: 'patients-list', component: () => import('@/views/Patients/PatientsList.vue') },
      { path: 'pacientes/nuevo', name: 'patient-new', component: () => import('@/views/Patients/PatientForm.vue') },
      { path: 'pacientes/:id', name: 'patient-detail', component: () => import('@/views/Patients/PatientDetail.vue') },
      { path: 'medicos', name: 'doctors-list', component: () => import('@/views/Doctors/DoctorsList.vue') },
      { path: 'medicos/nuevo', name: 'doctor-new', component: () => import('@/views/Doctors/DoctorForm.vue') },
      { path: 'medicos/:id', name: 'doctor-detail', component: () => import('@/views/Doctors/DoctorDetail.vue') },
      { path: 'citas', name: 'appointments-calendar', component: () => import('@/views/Appointments/AppointmentsCalendar.vue') },
      { path: 'citas/nueva', name: 'appointment-new', component: () => import('@/views/Appointments/AppointmentForm.vue') },
      { path: 'citas/:id', name: 'appointment-detail', component: () => import('@/views/Appointments/AppointmentDetail.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;