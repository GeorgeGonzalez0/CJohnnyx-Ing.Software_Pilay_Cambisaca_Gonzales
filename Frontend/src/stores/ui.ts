import { defineStore } from 'pinia';

interface UIState {
  loading: boolean;
  message: string | null;
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    loading: false,
    message: null
  }),
  actions: {
    startLoading() { this.loading = true; },
    stopLoading() { this.loading = false; },
    setMessage(msg: string | null) { this.message = msg; }
  }
});