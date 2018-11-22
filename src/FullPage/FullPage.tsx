import { Grid } from '@material-ui/core'
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'

const styles: StyleRules = {
  container: {
    height: '100vh',
  },
}

class FullPage extends Component<WithStyles> {
  public render(): ReactNode {
    const { classes }: FullPage['props'] = this.props

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item>{this.props.children}</Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(FullPage)
