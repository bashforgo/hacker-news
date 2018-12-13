import { Component, ReactNode } from 'react'
import { Snapshot, Subscriber, Unsubscriber } from '../api'

export type WithUpdatesFrom<T> = (subscriber: Subscriber<T>) => Unsubscriber

interface WithUpdatesProps<T> {
  from: WithUpdatesFrom<T>
  children(data?: T): ReactNode
}

interface WithUpdatesState<T> {
  data?: T
}

class WithUpdates<T> extends Component<
  WithUpdatesProps<T>,
  WithUpdatesState<T>
> {
  public state: WithUpdatesState<T> = {}
  private _unsubscriber?: () => void

  public componentDidMount(): void {
    this._subscribe()
  }

  public componentDidUpdate(prevProps: WithUpdatesProps<T>): void {
    if (prevProps.from !== this.props.from) {
      this._unsubscribe()
      this._subscribe()
    }
  }

  public componentWillUnmount(): void {
    this._unsubscribe()
  }

  public render(): ReactNode {
    const { children }: this['props'] = this.props
    return children(this.state.data)
  }

  private _subscribe(): void {
    this._unsubscriber = this.props.from(
      (snap: Snapshot<T>): void => {
        this.setState({ data: snap.val() })
      },
    )
  }

  private _unsubscribe(): void {
    if (this._unsubscriber) this._unsubscriber()
    delete this._unsubscriber
  }
}

export default WithUpdates
