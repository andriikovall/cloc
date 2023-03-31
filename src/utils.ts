export const trim = (n: number, from: number, to: number) => {
  return Math.max(from, Math.min(to, n));
};
