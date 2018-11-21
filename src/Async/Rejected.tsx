import { Component, ReactNode } from 'react'

export interface RejectedProps {
  error?: Error
  children(error: Error): ReactNode
}

class Rejected extends Component<RejectedProps> {
  public render(): ReactNode {
    return this.props.children(this.props.error as Error)
  }
}

export default Rejected
