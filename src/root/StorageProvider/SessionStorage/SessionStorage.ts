import mem from 'mem'
import {
  Storage as StorageInterface,
  StorageBase,
  StorageFactory,
} from '../interfaces'
import NamespacedAbstractStorage from '../NamespacedAbstractStorage/NamespacedAbstractStorage'

class SessionStorage<T extends StorageBase> extends NamespacedAbstractStorage<
  T
> {
  public static create: StorageFactory['create'] = mem<
    StorageFactory['create']
  >(
    <T extends StorageBase>(namespace: string): StorageInterface<T> => {
      return new SessionStorage(namespace)
    },
  )

  private _namespace: string
  private constructor(namespace: string) {
    if (!window.sessionStorage) {
      throw new Error('no session storage')
    }
    super()
    this._namespace = namespace
  }

  protected get namespace(): string {
    return this._namespace
  }

  protected get storage(): Storage {
    return sessionStorage
  }
}

export default SessionStorage as StorageFactory
