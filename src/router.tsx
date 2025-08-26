export const globTree = import.meta.glob('./pages/**/*.tsx', {
  eager: true,
}) as Record<string, () => Promise<any>>
