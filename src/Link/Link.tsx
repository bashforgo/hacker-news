import { Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { TypographyProps } from '@material-ui/core/Typography'
import classnames from 'classnames'
import mem from 'mem'
import React, {
  Component,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react'
import { NavLink } from 'react-router-dom'

interface LinkProps extends TypographyProps {
  external?: boolean
  href: string
  children: ReactNode
}

const styles: StyleRulesCallback = (_theme: Theme): StyleRules => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

function withHref(href: string, external: boolean): FunctionComponent {
  return function Anchor({
    children,
    ...other
  }: {
    children?: ReactNode
  }): ReactElement<{}> {
    return external ? (
      <a href={href} {...other}>
        {children}
      </a>
    ) : (
      <NavLink to={href} activeClassName="isActive" {...other}>
        {children}
      </NavLink>
    )
  }
}

class Link extends Component<LinkProps & WithStyles> {
  private _withHref: (
    href: string,
    external: boolean,
  ) => FunctionComponent = mem(withHref)

  public render(): ReactNode {
    const {
      classes,
      href,
      children,
      className,
      external = false,
      ...other
    }: Link['props'] = this.props

    return (
      <Typography
        className={classnames(classes.link, className)}
        component={this._withHref(href, external)}
        {...other}
      >
        {children}
      </Typography>
    )
  }
}

export default withStyles(styles)(Link)
