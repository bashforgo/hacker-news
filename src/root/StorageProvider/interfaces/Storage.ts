import { AnyRecord } from '../../../types'

export interface StorageFactory {
  create<T extends AnyRecord>(namespace: string): Storage<T>
}

export interface Storage<T extends AnyRecord> {
  get<Key extends keyof T, Otherwise>(
    key: Key,
    otherwise: Otherwise,
  ): Exclude<T[Key] | Otherwise, undefined>
  get<Key extends keyof T>(key: Key): T[Key] | undefined
  set<Key extends keyof T>(key: Key, value: T[Key]): void
  delete<Key extends keyof T>(key: Key): void
}
