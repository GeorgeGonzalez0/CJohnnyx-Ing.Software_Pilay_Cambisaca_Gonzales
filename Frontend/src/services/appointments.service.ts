import api from './http';
import type { Appointment } from '@/models/appointment';

export async function listAppointments(params?: { fecha?: string; estado?: string; page?: number }) {
  const { data } = await api.get<Appointment[]>('/citas', { params });
  return data;
}

export async function getAppointment(id: number) {
  const { data } = await api.get<Appointment>(`/citas/${id}`);
  return data;
}

export async function createAppointment(payload: Omit<Appointment, 'id'>) {
  const { data } = await api.post<Appointment>('/citas', payload);
  return data;
}

export async function updateAppointment(id: number, payload: Partial<Omit<Appointment, 'id'>>) {
  const { data } = await api.put<Appointment>(`/citas/${id}`, payload);
  return data;
}

export async function deleteAppointment(id: number) {
  await api.delete(`/citas/${id}`);
}