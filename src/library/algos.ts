export const knuthMorrisPatternMatch = (text: string, pattern: string): number[] => {
  let indexes: number[] = [];
  let i = 0;

  while (i < text.length) {
    const substring = text.slice(i, i + pattern.length);

    if (substring.toLowerCase() === pattern.toLowerCase()) {
      indexes.push(i);
      i += pattern.length;
      continue;
    }
    i += 1;
  }
  return indexes;
};
