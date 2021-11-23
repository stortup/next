export function queryToString(
  q: string | undefined | string[],
): string | undefined {
  if (!q) return q;
  if (Array.isArray(q)) return q[0];
  return q;
}
