export type StorageBase = Record<string, unknown>

export interface StorageFactory {
  create<T extends StorageBase>(namespace: string): Storage<T>
}

export interface Storage<T extends StorageBase> {
  get<Key extends keyof T>(key: Key): T[Key] | undefined
  set<Key extends keyof T>(key: Key, value: T[Key]): void
}
