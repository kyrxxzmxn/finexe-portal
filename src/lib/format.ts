export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function toDsrBand(dsr: number): DsrBand {
  if (dsr < 20) return '0-20';
  if (dsr < 30) return '20-30';
  if (dsr < 40) return '30-40';
  if (dsr < 50) return '40-50';
  if (dsr < 60) return '50-60';
  return '60+';
}

export function safeNumber(value: string | number | undefined, fallback = 0): number {
  const output = Number(value ?? fallback);
  return Number.isFinite(output) ? output : fallback;
}

export function generateId(prefix = 'FIN') {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
