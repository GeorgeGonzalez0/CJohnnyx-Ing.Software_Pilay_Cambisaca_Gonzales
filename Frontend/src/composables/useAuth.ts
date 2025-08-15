
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export function useAuth() {
  const auth = useAuthStore();
  const { isAuthenticated, token } = storeToRefs(auth);
  return {
    isAuthenticated,
    token,
    login: auth.login,
    logout: auth.logout
  };
}
