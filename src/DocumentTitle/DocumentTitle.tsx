import { Component, ReactNode } from 'react'

interface DocumentTitleProps {
  children: string
}

class DocumentTitle extends Component<DocumentTitleProps> {
  public componentDidMount(): void {
    this._update()
  }

  public componentDidUpdate(): void {
    this._update()
  }

  public render(): ReactNode {
    return null
  }

  private _update(): void {
    document.title = this.props.children
  }
}

export default DocumentTitle
