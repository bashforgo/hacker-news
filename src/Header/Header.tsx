import {
  AppBar,
  Button,
  Drawer,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
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
import Breakpoint from '../Breakpoint/Breakpoint'
import { Feed } from '../HeadlineList/HeadlineList'
import Link from '../Link/Link'
import { interleave } from '../util'
import WithToggle from '../WithToggle/WithToggle'
import Settings from './Settings/Settings'

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  toolbar: {
    maxWidth: theme.spacing.unit * 150,
    alignSelf: 'center',
    width: '100%',
  },
  home: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing.unit,
  },
  feedList: {
    display: 'block',
    margin: 0,
    padding: 0,
  },
  feedLink: {
    display: 'inline-block',
    margin: 0,
    padding: 0,
  },
  feedLinkText: {
    fontWeight: theme.typography.fontWeightLight,
    flexGrow: 1,
    '&.isActive::before': {
      content: '"> "',
    },
  },
  homeButton: {
    textTransform: 'none',
  },
  drawer: {
    minWidth: '50vw',
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
  private static _feeds: Feed[] = ['new', 'best', 'ask', 'show', 'job']

  public render(): ReactNode {
    const { t, classes }: Header['props'] = this.props

    return (
      <>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Breakpoint at="sm">
              <Breakpoint.Up>
                <Link href="/" className={classes.home}>
                  <Hackernews />
                  <Typography variant="h6" color="inherit">
                    {t('shared:appName')}
                  </Typography>
                </Link>
                <ul className={classes.feedList}>
                  {interleave(
                    Header._feeds.map((feed: Feed) => (
                      <li className={classes.feedLink} key={feed}>
                        <Link
                          href={`/${feed}`}
                          variant="h6"
                          className={classes.feedLinkText}
                        >
                          {t(feed)}
                        </Link>
                      </li>
                    )),
                    ' | ',
                  )}
                </ul>
              </Breakpoint.Up>
              <Breakpoint.Down>
                <WithToggle initial={false}>
                  {(open: boolean, toggle: () => void): ReactNode => (
                    <>
                      <Button
                        className={classes.homeButton}
                        onClick={toggle}
                        color="inherit"
                      >
                        <Hackernews color="inherit" />
                        <Typography variant="h6" color="inherit">
                          {t('shared:appName')}
                        </Typography>
                      </Button>
                      <Drawer anchor="left" open={open} onClose={toggle}>
                        <List className={classes.drawer}>
                          <ListItem key="top" button>
                            <Link
                              href="/"
                              color="inherit"
                              variant="h6"
                              className={classes.feedLinkText}
                              onClick={toggle}
                            >
                              {t('top')}
                            </Link>
                          </ListItem>
                          {Header._feeds.map((feed: Feed) => (
                            <ListItem key={feed} button>
                              <Link
                                href={`/${feed}`}
                                color="inherit"
                                variant="h6"
                                className={classes.feedLinkText}
                                onClick={toggle}
                              >
                                {t(feed)}
                              </Link>
                            </ListItem>
                          ))}
                        </List>
                      </Drawer>
                    </>
                  )}
                </WithToggle>
              </Breakpoint.Down>
            </Breakpoint>
            <span className={classes.spacer} />
            <Settings />
          </Toolbar>
        </AppBar>
        <span className={classes.contentShift} />
      </>
    )
  }
}

export default withNamespaces('Header')(withStyles(styles)(Header))
