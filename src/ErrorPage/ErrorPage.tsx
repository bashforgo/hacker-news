import { Grid } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Error } from '@material-ui/icons'
import React, { Component, ReactNode } from 'react'

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    height: '100vh',
  },
  icon: {
    fontSize: theme.typography.h1.fontSize,
  },
})

class ErrorPage extends Component<WithStyles> {
  public render(): ReactNode {
    const { classes }: ErrorPage['props'] = this.props

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item>
          <Error className={classes.icon} color="error" />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ErrorPage)
