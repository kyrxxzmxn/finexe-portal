export type DsrBand = '0-20' | '20-30' | '30-40' | '40-50' | '50-60' | '60+';

export function toDsrBand(dsr: number): DsrBand {
  if (dsr < 20) return '0-20';
  if (dsr < 30) return '20-30';
  if (dsr < 40) return '30-40';
  if (dsr < 50) return '40-50';
  if (dsr < 60) return '50-60';
  return '60+';
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 0
  }).format(value);
}
