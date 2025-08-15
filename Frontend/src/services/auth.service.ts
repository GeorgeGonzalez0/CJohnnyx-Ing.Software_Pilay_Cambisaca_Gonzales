import api from './http';
import type { LoginRequest, LoginResponse } from '@/models/auth';

export async function login(payload: LoginRequest): Promise<string> {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  // Ajusta según tu backend: comúnmente devuelve { access_token, token_type }
  const token = (data as any).access_token || (data as any).token || '';
  if (!token) throw new Error('Token no recibido');
  return token;
}