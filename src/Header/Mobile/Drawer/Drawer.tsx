import { Drawer as MuiDrawer, List } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'
import { WithNamespaces, withNamespaces } from 'react-i18next'
import Link from '../../../Link/Link'
import FeedRoute, { feeds, MainFeed } from '../../../routes/FeedRoute/FeedRoute'

interface DrawerProps {
  open: boolean
  toggle(): void
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  feedLink: {
    ...theme.mixins.feedLink,
    padding: theme.spacing.unit,
    width: '100%',
  },
  drawer: {
    minWidth: '50vw',
  },
})

class Drawer extends Component<DrawerProps & WithStyles & WithNamespaces> {
  public render(): ReactNode {
    const { open, toggle, t, classes }: this['props'] = this.props

    return (
      <MuiDrawer anchor="left" open={open} onClose={toggle}>
        <nav>
          <List className={classes.drawer} aria-label={t('feeds')}>
            {feeds.map((feed: MainFeed) => (
              <li key={feed}>
                <Link
                  href={FeedRoute.makeURL({ feed })}
                  color="textPrimary"
                  variant="h6"
                  className={classes.feedLink}
                  onClick={toggle}
                >
                  {t(feed)}
                </Link>
              </li>
            ))}
          </List>
        </nav>
      </MuiDrawer>
    )
  }
}

export default withNamespaces('Header')(withStyles(styles)(Drawer))
