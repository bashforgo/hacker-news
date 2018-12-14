export function clamp(
  n: number,
  low: number = 0,
  high: number = Infinity,
): number {
  if (n < low) {
    return low
  }

  if (n > high) {
    return high
  }

  return n
}
