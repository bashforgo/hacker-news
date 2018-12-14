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

  protected get storage(): Storage {
    if (!window.sessionStorage) {
      throw new Error('no session storage')
    }

    return sessionStorage
  }
}

export default SessionStorage as StorageFactory
