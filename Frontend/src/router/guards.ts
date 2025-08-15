import type { NavigationGuard } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export const requireAuth: NavigationGuard = (_to, _from, next) => {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) return next('/login');
  next();
};
