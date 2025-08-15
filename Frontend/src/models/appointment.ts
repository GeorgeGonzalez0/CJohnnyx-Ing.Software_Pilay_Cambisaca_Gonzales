export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

export interface Appointment {
  id: number;
  paciente_id: number;
  medico_id: number;
  fecha: string; // ISO 8601
  estado: AppointmentStatus;
  notas?: string;
  created_at?: string;
  updated_at?: string;
}