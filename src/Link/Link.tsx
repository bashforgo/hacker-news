import { Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { TypographyProps } from '@material-ui/core/Typography'
import React, { Component, ReactNode } from 'react'

interface LinkProps extends TypographyProps {
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

class Link extends Component<LinkProps & WithStyles> {
  public render(): ReactNode {
    const { classes, href, children, ...other }: Link['props'] = this.props

    return (
      <Typography {...other}>
        <a href={href} className={classes.link}>
          {children}
        </a>
      </Typography>
    )
  }
}

export default withStyles(styles)(Link)
