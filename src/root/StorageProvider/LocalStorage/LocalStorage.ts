import { Storage, StorageFactory } from '../interfaces'

const LocalStorage: StorageFactory = {
  create<T extends Record<string, unknown>>(namespace: string): Storage<T> {
    class NamespacedLocalStorage implements Storage<T> {
      private _cache: T

      constructor() {
        if (!window.localStorage) {
          throw new Error('no local storage')
        }

        this._cache = this._decode()
      }

      public get<Key extends keyof T>(key: Key): T[Key] | undefined {
        return this._cache[key]
      }

      public set<Key extends keyof T>(key: Key, value: T[Key]): void {
        this._cache[key] = value
        this._encode()
      }

      private _decode(): T {
        return JSON.parse(localStorage.getItem(namespace) || '{}')
      }

      private _encode(): void {
        localStorage.setItem(namespace, JSON.stringify(this._cache))
      }
    }

    return new NamespacedLocalStorage()
  },
}

export default LocalStorage
