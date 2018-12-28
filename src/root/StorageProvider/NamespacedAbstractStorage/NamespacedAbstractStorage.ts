import { AnyRecord } from '../../../types'
import { Storage as StorageInterface } from '../interfaces'

abstract class NamespacedAbstractStorage<T extends AnyRecord>
  implements StorageInterface<T> {
  private _cache: T

  constructor(private _namespace: string) {
    this._cache = this._decode()
  }

  public get<Key extends keyof T>(key: Key): T[Key] | undefined
  public get<Key extends keyof T, Otherwise>(
    key: Key,
    otherwise?: Otherwise,
  ): T[Key] | Otherwise {
    return (this._cache[key] || otherwise) as T[Key] | Otherwise
  }

  public set<Key extends keyof T>(key: Key, value: T[Key]): void {
    this._cache[key] = value
    this._encode()
  }

  public delete<Key extends keyof T>(key: Key): void {
    delete this._cache[key]
    this._encode()
  }

  protected abstract get storage(): Storage

  private _decode(): T {
    return JSON.parse(this.storage.getItem(this._namespace) || '{}')
  }

  private _encode(): void {
    this.storage.setItem(this._namespace, JSON.stringify(this._cache))
  }
}

export default NamespacedAbstractStorage
