import { defineStore } from 'pinia';
import { login as apiLogin } from '@/services/auth.service';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (s) => !!s.token
  },
  actions: {
    setToken(t: string | null) {
      this.token = t;
      if (t) localStorage.setItem('token', t);
      else localStorage.removeItem('token');
    },
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const token = await apiLogin({ username, password });
        this.setToken(token);
      } catch (e: any) {
        this.error = e?.response?.data?.detail || 'Error de autenticación';
        this.setToken(null);
        throw e;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.setToken(null);
    }
  }
});