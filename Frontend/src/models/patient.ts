export interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email?: string;
  telefono?: string;
  created_at?: string;
  updated_at?: string;
}