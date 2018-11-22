import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Hackernews } from 'mdi-material-ui'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'

class Header extends Component<WithNamespaces> {
  public render(): ReactNode {
    const { t }: Header['props'] = this.props

    return (
      <AppBar>
        <Toolbar>
          <Hackernews />
          <Typography variant="h6">{t('appName')}</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withNamespaces()(Header)
