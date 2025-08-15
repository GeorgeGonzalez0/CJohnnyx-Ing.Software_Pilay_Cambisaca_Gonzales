export function required(v: string | number | null | undefined, msg = 'Campo requerido') {
  if (v === null || v === undefined) return msg;
  if (typeof v === 'string' && v.trim() === '') return msg;
  return true;
}

export function email(v: string, msg = 'Email inválido') {
  if (!v) return true;
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return ok || msg;
}
