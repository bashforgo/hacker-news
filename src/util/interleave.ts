export function interleave<T = unknown, U = unknown>(
  array: T[],
  insert: U,
): Array<T | U> {
  const res: Array<T | U> = []
  for (const item of array) {
    res.push(item, insert)
  }
  res.pop()
  return res
}
