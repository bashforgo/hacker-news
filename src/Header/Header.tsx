import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { StyleRules, WithStyles, withStyles } from '@material-ui/core/styles'
import { Hackernews } from 'mdi-material-ui'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import Settings from './Settings/Settings'

const styles: StyleRules = {
  spacer: {
    flexGrow: 1,
  },
}
class Header extends Component<WithNamespaces & WithStyles> {
  public render(): ReactNode {
    const { t, classes }: Header['props'] = this.props

    return (
      <AppBar>
        <Toolbar>
          <Hackernews />
          <Typography variant="h6" color="inherit">
            {t('appName')}
          </Typography>
          <span className={classes.spacer} />
          <Settings />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withNamespaces()(withStyles(styles)(Header))
