import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@vue/test-utils';

beforeAll(() => {
  // Mock localStorage
  const store: Record<string, string> = {};
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] || null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    key: (i: number) => Object.keys(store)[i] || null,
    length: 0
  });
});

afterEach(() => {
  cleanup();
});
