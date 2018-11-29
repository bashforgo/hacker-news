import { AppBar, Toolbar, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { Hackernews } from 'mdi-material-ui'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import Settings from './Settings/Settings'

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  toolbar: {
    maxWidth: theme.spacing.unit * 150,
    alignSelf: 'center',
    width: '100%',
  },
  spacer: {
    flexGrow: 1,
  },
  contentShift: {
    ...theme.mixins.toolbar,
    display: 'block',
  },
})

class Header extends Component<WithNamespaces & WithStyles> {
  public render(): ReactNode {
    const { t, classes }: Header['props'] = this.props

    return (
      <>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Hackernews />
            <Typography variant="h6" color="inherit">
              {t('appName')}
            </Typography>
            <span className={classes.spacer} />
            <Settings />
          </Toolbar>
        </AppBar>
        <span className={classes.contentShift} />
      </>
    )
  }
}

export default withNamespaces()(withStyles(styles)(Header))
