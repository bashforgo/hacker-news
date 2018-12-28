import mem from 'mem'
import { AnyRecord } from '../../../types'
import { Storage as StorageInterface, StorageFactory } from '../interfaces'
import NamespacedAbstractStorage from '../NamespacedAbstractStorage/NamespacedAbstractStorage'

class LocalStorage<T extends AnyRecord> extends NamespacedAbstractStorage<T> {
  public static create: StorageFactory['create'] = mem<
    StorageFactory['create']
  >(
    <T extends AnyRecord>(namespace: string): StorageInterface<T> => {
      return new LocalStorage(namespace)
    },
  )

  protected get storage(): Storage {
    if (!window.localStorage) {
      throw new Error('no local storage')
    }

    return localStorage
  }
}

export default LocalStorage as StorageFactory
