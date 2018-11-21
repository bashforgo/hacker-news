import { Component, ReactNode } from 'react'

export interface ResolvedProps<T> {
  data?: T
  children(data: T): ReactNode
}

class Resolved<T> extends Component<ResolvedProps<T>> {
  public render(): ReactNode {
    return this.props.children(this.props.data as T)
  }
}

export default Resolved
