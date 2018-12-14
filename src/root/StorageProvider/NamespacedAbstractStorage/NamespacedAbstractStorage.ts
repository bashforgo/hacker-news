import { Storage as StorageInterface, StorageBase } from '../interfaces'

abstract class NamespacedAbstractStorage<T extends StorageBase>
  implements StorageInterface<T> {
  private _cache: T

  constructor() {
    this._cache = this._decode()
  }

  public get<Key extends keyof T, Otherwise = undefined>(
    key: Key,
    otherwise?: Otherwise,
  ): T[Key] | Otherwise {
    return this._cache[key] || otherwise
  }

  public set<Key extends keyof T>(key: Key, value: T[Key]): void {
    this._cache[key] = value
    this._encode()
  }

  public delete<Key extends keyof T>(key: Key): void {
    delete this._cache[key]
    this._encode()
  }

  protected abstract get namespace(): string
  protected abstract get storage(): Storage

  private _decode(): T {
    return JSON.parse(this.storage.getItem(this.namespace) || '{}')
  }

  private _encode(): void {
    this.storage.setItem(this.namespace, JSON.stringify(this._cache))
  }
}

export default NamespacedAbstractStorage
