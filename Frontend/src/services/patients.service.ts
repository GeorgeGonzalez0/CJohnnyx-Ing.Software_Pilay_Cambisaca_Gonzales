import api from './http';
import type { Patient } from '@/models/patient';

export async function listPatients(params?: { q?: string; page?: number }) {
  const { data } = await api.get<Patient[]>('/pacientes', { params });
  return data;
}

export async function getPatient(id: number) {
  const { data } = await api.get<Patient>(`/pacientes/${id}`);
  return data;
}

export async function createPatient(payload: Omit<Patient, 'id'>) {
  const { data } = await api.post<Patient>('/pacientes', payload);
  return data;
}

export async function updatePatient(id: number, payload: Partial<Omit<Patient, 'id'>>) {
  const { data } = await api.put<Patient>(`/pacientes/${id}`, payload);
  return data;
}

export async function deletePatient(id: number) {
  await api.delete(`/pacientes/${id}`);
}