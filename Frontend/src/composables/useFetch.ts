import { ref } from 'vue';

export function useFetch<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const run = async () => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e: any) {
      error.value = e?.response?.data?.detail || e?.message || 'Error';
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, run };
}
