import { Component, ReactNode } from 'react'

class Pending extends Component {
  public render(): ReactNode {
    return this.props.children
  }
}

export default Pending
