import { Grid, Typography } from '@material-ui/core'
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
import Link from '../../Link/Link'
import FeedRoute, { feeds, MainFeed } from '../../routes/FeedRoute/FeedRoute'
import { interleave } from '../../util'

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
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
  feedLinkItem: {
    display: 'inline-block',
    margin: 0,
    padding: 0,
  },
  feedLink: theme.mixins.feedLink,
})

class Desktop extends Component<WithNamespaces & WithStyles> {
  public render(): ReactNode {
    const { t, classes }: this['props'] = this.props

    return (
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
              <li className={classes.feedLinkItem} key={feed}>
                <Link
                  href={FeedRoute.makeURL({ feed })}
                  variant="h6"
                  className={classes.feedLink}
                >
                  {t(feed)}
                </Link>
              </li>
            )),
            ' | ',
          )}
        </ul>
      </Grid>
    )
  }
}

export default withNamespaces('Header')(withStyles(styles)(Desktop))
