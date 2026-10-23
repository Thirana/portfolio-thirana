// Deterministic tag dot colors, deep enough to read on the paper ground.
const SWATCH_COLORS = [
  "var(--gl-swatch-1)",
  "var(--gl-swatch-2)",
  "var(--gl-swatch-3)",
  "var(--gl-swatch-4)",
  "var(--gl-swatch-5)",
  "var(--gl-swatch-6)",
];

export function getSwatchColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  }
  return SWATCH_COLORS[hash % SWATCH_COLORS.length];
}
