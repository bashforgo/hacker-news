import { Bind } from 'lodash-decorators'
import React, {
  Component,
  ComponentType,
  Context,
  createContext,
  ReactElement,
  ReactNode,
} from 'react'
import { noop } from '../../util'
import { Storage, StorageBase } from './interfaces'
import LocalStorage from './LocalStorage/LocalStorage'
import SessionStorage from './SessionStorage/SessionStorage'

export type Storage<T extends StorageBase> = Storage<T>
export enum StorageType {
  LOCAL,
  SESSION,
}
export const { LOCAL, SESSION }: typeof StorageType = StorageType

interface StorageContextType {
  getStore<T extends StorageBase>(
    namespace: string,
    type?: StorageType,
  ): Storage<T>
}

const StorageContext: Context<StorageContextType> = createContext({
  getStore: noop,
} as StorageContextType)

export function StorageConsumer<T>({
  namespace,
  type,
  children,
}: {
  namespace: string
  type?: StorageType
  children: (storage: Storage<T>) => ReactNode
}): ReactElement<{}> {
  return (
    <StorageContext.Consumer>
      {(context: StorageContextType): ReactNode =>
        children(context.getStore(namespace, type))
      }
    </StorageContext.Consumer>
  )
}

export interface WithStorage<T> {
  storage: Storage<T>
}
type WithoutStorage<P> = Pick<P, Exclude<keyof P, 'storage'>>

export function withStorage<T extends StorageBase>(
  namespace: string,
  type?: StorageType,
): <P extends WithStorage<T>>(
  Cmp: ComponentType<P>,
) => ComponentType<WithoutStorage<P>> {
  return <P extends WithStorage<T>>(
    Cmp: ComponentType<P>,
  ): ComponentType<WithoutStorage<P>> => {
    return function WithStorageCmp(props: WithoutStorage<P>): ReactElement<{}> {
      return (
        <StorageContext.Consumer>
          {(context: StorageContextType): ReactElement<{}> => (
            <Cmp storage={context.getStore(namespace, type)} {...props} />
          )}
        </StorageContext.Consumer>
      )
    }
  }
}

class StorageProvider extends Component {
  public render(): ReactNode {
    return (
      <StorageContext.Provider
        value={{
          getStore: this._getStore,
        }}
      >
        {this.props.children}
      </StorageContext.Provider>
    )
  }

  @Bind()
  private _getStore<T extends StorageBase>(
    namespace: string,
    type: StorageType = LOCAL,
  ): Storage<T> {
    switch (type) {
      case LOCAL:
        return LocalStorage.create(namespace)
      case SESSION:
        return SessionStorage.create(namespace)
    }
  }
}

export default StorageProvider
