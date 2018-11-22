import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { AlertCircle } from 'mdi-material-ui'
import React, { Component, ReactNode } from 'react'
import FullPage from '../FullPage/FullPage'

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  icon: {
    fontSize: theme.typography.h1.fontSize,
  },
})

class ErrorPage extends Component<WithStyles> {
  public render(): ReactNode {
    const { classes }: ErrorPage['props'] = this.props

    return (
      <FullPage>
        <AlertCircle className={classes.icon} color="error" />
      </FullPage>
    )
  }
}

export default withStyles(styles)(ErrorPage)
