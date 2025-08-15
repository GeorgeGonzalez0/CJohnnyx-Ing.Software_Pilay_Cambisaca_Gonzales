import api from './http';
import type { Doctor } from '@/models/doctor';

export async function listDoctors(params?: { q?: string; page?: number }) {
  const { data } = await api.get<Doctor[]>('/medicos', { params });
  return data;
}

export async function getDoctor(id: number) {
  const { data } = await api.get<Doctor>(`/medicos/${id}`);
  return data;
}

export async function createDoctor(payload: Omit<Doctor, 'id'>) {
  const { data } = await api.post<Doctor>('/medicos', payload);
  return data;
}

export async function updateDoctor(id: number, payload: Partial<Omit<Doctor, 'id'>>) {
  const { data } = await api.put<Doctor>(`/medicos/${id}`, payload);
  return data;
}

export async function deleteDoctor(id: number) {
  await api.delete(`/medicos/${id}`);
}