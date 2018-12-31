import { Button, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { Bind } from 'lodash-decorators'
import { Hackernews } from 'mdi-material-ui'
import React, { Component, lazy, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import OnDemand from '../../OnDemand/OnDemand'
import WithToggle from '../../WithToggle/WithToggle'

// tslint:disable-next-line:typedef
const Drawer = lazy(() => import('./Drawer/Drawer'))

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  homeButton: {
    textTransform: 'none',
  },
})

class Mobile extends Component<WithNamespaces & WithStyles> {
  public render(): ReactNode {
    return <WithToggle initial={false}>{this._withToggle}</WithToggle>
  }

  @Bind()
  private _withToggle(open: boolean, toggle: () => void): ReactNode {
    const { t, classes }: this['props'] = this.props
    return (
      <>
        <Button className={classes.homeButton} onClick={toggle} color="inherit">
          <Hackernews color="inherit" />
          <Typography variant="h6" color="inherit">
            {t('shared:appName')}
          </Typography>
        </Button>
        <OnDemand render={open}>
          <Drawer open={open} toggle={toggle} />
        </OnDemand>
      </>
    )
  }
}

export default withNamespaces('Header')(withStyles(styles)(Mobile))
