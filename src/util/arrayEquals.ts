export function arrayEquals<T>(left: T[], right: T[]): boolean {
  return (
    left.length === right.length &&
    left.every((v: T, i: number): boolean => v === right[i])
  )
}
