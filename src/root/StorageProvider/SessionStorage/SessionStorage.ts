import mem from 'mem'
import { AnyRecord } from '../../../types'
import { Storage as StorageInterface, StorageFactory } from '../interfaces'
import NamespacedAbstractStorage from '../NamespacedAbstractStorage/NamespacedAbstractStorage'

class SessionStorage<T extends AnyRecord> extends NamespacedAbstractStorage<T> {
  public static create: StorageFactory['create'] = mem<
    StorageFactory['create']
  >(
    <T extends AnyRecord>(namespace: string): StorageInterface<T> => {
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
