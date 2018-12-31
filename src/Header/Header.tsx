import { AppBar, Toolbar } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { Component, lazy, ReactNode, Suspense } from 'react'
import Breakpoint from '../Breakpoint/Breakpoint'
import Settings from './Settings/Settings'

// tslint:disable:typedef
const Desktop = lazy(() => import('./Desktop/Desktop'))
const Mobile = lazy(() => import('./Mobile/Mobile'))
// tslint:enable:typedef

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  toolbar: {
    maxWidth: theme.mixins.toolbarMaxWidth,
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

class Header extends Component<WithStyles> {
  public render(): ReactNode {
    const { classes }: Header['props'] = this.props

    return (
      <>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Suspense fallback="">
              <Breakpoint at="sm">
                <Breakpoint.Up>
                  <Desktop />
                </Breakpoint.Up>
                <Breakpoint.Down>
                  <Mobile />
                </Breakpoint.Down>
              </Breakpoint>
            </Suspense>
            <span className={classes.spacer} />
            <Settings />
          </Toolbar>
        </AppBar>
        <span className={classes.contentShift} />
      </>
    )
  }
}

export default withStyles(styles)(Header)
