import React, {
  Children,
  cloneElement,
  Component,
  ReactChild,
  ReactElement,
  ReactNode,
} from 'react'
import Pending from './Pending'
import Rejected, { RejectedProps } from './Rejected'
import Resolved, { ResolvedProps } from './Resolved'

export interface AsyncProps<T> {
  promise(): Promise<T>
}

type AsyncPromiseState = 'pending' | 'resolved' | 'rejected'
interface StateToChild<T = unknown> {
  pending: null | ReactElement<{}>
  resolved: null | ReactElement<ResolvedProps<T>>
  rejected: null | ReactElement<RejectedProps>
}

interface AsyncState<T> {
  promise: Promise<T>
  state: AsyncPromiseState
  data?: T
  error?: Error
}

class Async<T> extends Component<AsyncProps<T>, AsyncState<T>> {
  public static Pending: typeof Pending = Pending
  public static Rejected: typeof Rejected = Rejected
  public static Resolved: typeof Resolved = Resolved
  private static _emptyStateToChild: StateToChild = {
    pending: null,
    resolved: null,
    rejected: null,
  }

  public constructor(props: Async<T>['props']) {
    super(props)
    const promise: Promise<T> = this.props.promise()
    this.state = {
      promise,
      state: 'pending',
    }
  }

  public componentDidMount(): void {
    this.state.promise
      .then((result: T) =>
        this.setState({
          data: result,
          state: 'resolved',
        }),
      )
      .catch((error: unknown) =>
        this.setState({
          error: error instanceof Error ? error : new Error(`${error}`),
          state: 'rejected',
        }),
      )
  }

  public render(): ReactNode {
    const stateToChild: StateToChild<T> = this._getStateToChild()

    switch (this.state.state) {
      case 'pending':
        return stateToChild.pending
      case 'resolved':
        if (!stateToChild.resolved) return null
        return cloneElement(stateToChild.resolved, { data: this.state.data })
      case 'rejected':
        if (!stateToChild.rejected) return null
        return cloneElement(stateToChild.rejected, { error: this.state.error })
    }
  }

  private _getStateToChild(): StateToChild<T> {
    const result: StateToChild = { ...Async._emptyStateToChild }
    Children.forEach(this.props.children, (child: ReactChild) => {
      if (typeof child !== 'object') return this._dieInvalidChild()

      switch (child.type) {
        case Pending:
          result.pending = result.pending || child
          break
        case Resolved:
          result.resolved = result.resolved || child
          break
        case Rejected:
          result.rejected = result.rejected || child
          break
        default:
          this._dieInvalidChild()
      }
    })

    return result as StateToChild<T>
  }

  private _dieInvalidChild(): never {
    throw new Error('use only Async.* components as a child to Async')
  }
}

export default Async
