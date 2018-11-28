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

export type Storage<T extends StorageBase> = Storage<T>

interface StorageContextType {
  getStore<T = StorageBase>(namespace: string): Storage<T>
}

const StorageContext: Context<StorageContextType> = createContext({
  getStore: noop,
} as StorageContextType)

export function StorageConsumer<T>({
  namespace,
  children,
}: {
  namespace: string
  children: (storage: Storage<T>) => ReactNode
}): ReactElement<{}> {
  return (
    <StorageContext.Consumer>
      {(context: StorageContextType): ReactNode =>
        children(context.getStore(namespace))
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
            <Cmp storage={context.getStore(namespace)} {...props} />
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
          getStore: LocalStorage.create,
        }}
      >
        {this.props.children}
      </StorageContext.Provider>
    )
  }
}

export default StorageProvider
