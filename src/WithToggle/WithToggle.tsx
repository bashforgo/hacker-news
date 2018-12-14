import { Bind } from 'lodash-decorators'
import { Component, ReactNode } from 'react'

interface ToggleProps {
  initial: boolean
  onChange?(state: boolean): void
  children(state: boolean, toggle: () => void): ReactNode
}

interface ToggleState {
  value: boolean
}

class Toggle extends Component<ToggleProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props)
    this.state = { value: props.initial }
  }

  public render(): ReactNode {
    return this.props.children(this.state.value, this._toggle)
  }

  @Bind()
  private _toggle(): void {
    this.setState(
      ({ value }: ToggleState) => ({ value: !value }),
      () => {
        if (this.props.onChange) this.props.onChange(this.state.value)
      },
    )
  }
}

export default Toggle
