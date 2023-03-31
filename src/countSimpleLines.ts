import { trim } from './utils';

export const countSimpleLines = (
  code: string,
): {
  total: number;
  empty: number;
  physical: number;
} => {
  const totalLines = code.split('\n');
  const emptyLines = totalLines.filter(line => line.trim() === '');
  const maxEmptyLinesCount = Math.floor(
    trim(emptyLines.length, 0, totalLines.length * 0.25),
  );
  const physicalLinesCount =
    totalLines.length -
    (emptyLines.length > maxEmptyLinesCount
      ? emptyLines.length - maxEmptyLinesCount
      : 0);

  return {
    total: totalLines.length,
    empty: emptyLines.length,
    physical: physicalLinesCount,
  };
};
