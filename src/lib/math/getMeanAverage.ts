export function getMeanAverage(numbers: number[]): number {
  return numbers.reduce((number, i) => number + i, 0) / numbers.length;
}
