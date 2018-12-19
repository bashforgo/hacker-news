import {
  AppBar,
  Button,
  Drawer,
  Grid,
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
import Link from '../Link/Link'
import FeedRoute, { feeds, MainFeed } from '../routes/FeedRoute/FeedRoute'
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
  public render(): ReactNode {
    const { t, classes }: Header['props'] = this.props

    return (
      <>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Breakpoint at="sm">
              <Breakpoint.Up>
                <Grid container component="nav">
                  <Link
                    href={FeedRoute.makeURL({ feed: 'top' })}
                    className={classes.home}
                  >
                    <Hackernews />
                    <Typography variant="h6" color="inherit">
                      {t('shared:appName')}
                    </Typography>
                  </Link>
                  <ul className={classes.feedList} aria-label={t('feeds')}>
                    {interleave(
                      feeds.map((feed: MainFeed) => (
                        <li className={classes.feedLink} key={feed}>
                          <Link
                            href={FeedRoute.makeURL({ feed })}
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
                </Grid>
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
                        <nav>
                          <List
                            className={classes.drawer}
                            aria-label={t('feeds')}
                          >
                            {feeds.map((feed: MainFeed) => (
                              <ListItem key={feed} button component="li">
                                <Link
                                  href={FeedRoute.makeURL({ feed })}
                                  color="textPrimary"
                                  variant="h6"
                                  className={classes.feedLinkText}
                                  onClick={toggle}
                                >
                                  {t(feed)}
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        </nav>
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
