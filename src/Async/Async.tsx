import {
  Children,
  cloneElement,
  Component,
  ReactChild,
  ReactElement,
  ReactNode,
} from 'react'
import { PENDING, REJECTED, RESOLVED, StatefulPromise } from '../util'
import Pending from './Pending'
import Rejected, { RejectedProps } from './Rejected'
import Resolved, { ResolvedProps } from './Resolved'

export interface AsyncProps<T> {
  promise(): Promise<T>
}

interface StateToChild<T = unknown> {
  [PENDING]: null | ReactElement<{}>
  [RESOLVED]: null | ReactElement<ResolvedProps<T>>
  [REJECTED]: null | ReactElement<RejectedProps>
}

interface AsyncState<T> {
  promise: StatefulPromise<T>
  data?: T
  error?: Error
}

class Async<T> extends Component<AsyncProps<T>, AsyncState<T>> {
  public static Pending: typeof Pending = Pending
  public static Rejected: typeof Rejected = Rejected
  public static Resolved: typeof Resolved = Resolved
  private static _emptyStateToChild: StateToChild = {
    [PENDING]: null,
    [RESOLVED]: null,
    [REJECTED]: null,
  }

  public constructor(props: Async<T>['props']) {
    super(props)
    const promise: StatefulPromise<T> = new StatefulPromise(props.promise())
    this.state = { promise }
  }

  public componentDidMount(): void {
    this.state.promise.value
      .then((result: T) =>
        this.setState({
          data: result,
        }),
      )
      .catch((error: unknown) =>
        this.setState({
          error: error instanceof Error ? error : new Error(`${error}`),
        }),
      )
  }

  public render(): ReactNode {
    const stateToChild: StateToChild<T> = this._getStateToChild()
    let element:
      | null
      | ReactElement<ResolvedProps<T>>
      | ReactElement<RejectedProps> = null

    switch (this.state.promise.state) {
      case PENDING:
        return stateToChild[PENDING]
      case RESOLVED:
        element = stateToChild[RESOLVED]
        if (!element) return null
        return cloneElement(element, { data: this.state.data })
      case REJECTED:
        element = stateToChild[REJECTED]
        if (!element) return null
        return cloneElement(element, { error: this.state.error })
    }
  }

  private _getStateToChild(): StateToChild<T> {
    const result: StateToChild = { ...Async._emptyStateToChild }
    Children.forEach(this.props.children, (child: ReactChild) => {
      if (typeof child !== 'object') return this._dieInvalidChild()

      switch (child.type) {
        case Pending:
          result[PENDING] = result[PENDING] || child
          break
        case Resolved:
          result[RESOLVED] = result[RESOLVED] || child
          break
        case Rejected:
          result[REJECTED] = result[REJECTED] || child
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
