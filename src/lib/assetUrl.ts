export function getFigureUrl(filename: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = base.endsWith('/') ? base : `${base}/`;
  return `${normalized}figures/${filename}`;
}
