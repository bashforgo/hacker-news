export type StorageBase = Record<string | number, unknown>

export interface StorageFactory {
  create<T extends StorageBase>(namespace: string): Storage<T>
}

export interface Storage<T extends StorageBase> {
  get<Key extends keyof T, Otherwise>(
    key: Key,
    otherwise: Otherwise,
  ): T[Key] | Otherwise
  get<Key extends keyof T>(key: Key): T[Key] | undefined
  set<Key extends keyof T>(key: Key, value: T[Key]): void
  delete<Key extends keyof T>(key: Key): void
}
