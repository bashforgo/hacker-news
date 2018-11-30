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
import React, {
  Component,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface LinkProps extends TypographyProps {
  external?: boolean
  href: string
  children: string
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
      <RouterLink to={href} {...other}>
        {children}
      </RouterLink>
    )
  }
}

class Link extends Component<LinkProps & WithStyles> {
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
        component={withHref(href, external)}
        {...other}
      >
        {children}
      </Typography>
    )
  }
}

export default withStyles(styles)(Link)
