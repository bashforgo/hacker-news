import { Breakpoint as BreakpointId } from '@material-ui/core/styles/createBreakpoints'
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth'
import React, {
  Children,
  Component,
  ComponentClass,
  ComponentType,
  Fragment,
  ReactChild,
  ReactElement,
  ReactNode,
} from 'react'

interface BreakpointProps {
  at: BreakpointId
}

interface JustChildren {
  children: ReactNode
}
const Up: ComponentType<JustChildren> = ({
  children,
}: JustChildren): ReactElement<{}> => <>{children}</>
const Down: ComponentType<JustChildren> = ({
  children,
}: JustChildren): ReactElement<{}> => <>{children}</>

class Breakpoint extends Component<BreakpointProps & WithWidth> {
  public render(): ReactNode {
    const up: boolean = isWidthUp(this.props.at, this.props.width)
    let render: ReactNode = null
    Children.forEach(
      this.props.children,
      (child: ReactChild): void => {
        if (typeof child !== 'object') return this._dieInvalidChild()

        switch (child.type) {
          case Up:
            if (up) {
              render = render || child
            }
            break
          case Down:
            if (!up) {
              render = render || child
            }
            break
          default:
            this._dieInvalidChild()
        }
      },
    )

    return render
  }
  private _dieInvalidChild(): void {
    throw new Error('use only Breakpoint.* components as a child to Breakpoint')
  }
}

export default Object.assign(withWidth()(Breakpoint), { Up, Down })
