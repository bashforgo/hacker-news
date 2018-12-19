import { Button, Card, Grid, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind } from 'lodash-decorators'
import React, { Component, ComponentType, ReactElement, ReactNode } from 'react'
import { WithNamespaces, withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  FeedReader,
  getAskStories,
  getBestStories,
  getJobStories,
  getNewStories,
  getShowStories,
  getTopStories,
  ItemId,
  Items,
} from '../api'
import Headline from '../Headline/Headline'
import Paginated from '../Paginated/Paginated'
import FeedRoute, { MainFeed } from '../routes/FeedRoute/FeedRoute'
import { clamp } from '../util'
import WithUpdates from '../WithUpdates/WithUpdates'

interface HeadlineListProps {
  page?: number
  feed?: MainFeed
}

const PAGE_SIZE: number = 30
const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  list: {
    padding: 0,
    margin: 0,
    maxWidth: theme.spacing.unit * 120,
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
  pager: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing.unit}px`,
  },
})

function ButtonLinkTo(to: string): ComponentType {
  return function LinkTo(props: {}): ReactElement<{}> {
    return <Link to={to} {...props} />
  }
}

class HeadlineList extends Component<
  HeadlineListProps & WithStyles & WithNamespaces
> {
  public render(): ReactNode {
    return (
      <WithUpdates from={this._getFeedReader()}>{this._paginated}</WithUpdates>
    )
  }

  @Bind()
  private _paginated(data: Items = []): ReactNode {
    return (
      <Paginated data={data} page={this._getPage()} pageSize={PAGE_SIZE}>
        {this._renderList}
      </Paginated>
    )
  }

  @Bind()
  private _renderList(items: Items, numberOfPages: number): ReactNode {
    const { classes, t }: this['props'] = this.props

    return (
      <article>
        <Grid container justify="center">
          <Grid item component="ul" className={classes.list}>
            {items.map(
              (id: ItemId): ReactNode => (
                <Card component="li" className={classes.card} key={id}>
                  <Headline id={id} />
                </Card>
              ),
            )}
            {this._renderPager(numberOfPages)}
          </Grid>
        </Grid>
      </article>
    )
  }

  private _renderPager(numberOfPages: number): ReactNode {
    const { classes, t }: this['props'] = this.props

    return numberOfPages ? (
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignContent="center"
      >
        <Grid item>
          <Button
            disabled={this._getPage() <= 0}
            component={ButtonLinkTo(
              FeedRoute.makeURL({
                feed: this._getFeed(),
                page: clamp(this._getPage() - 1, 0, numberOfPages),
              }),
            )}
          >
            {t('previous')}
          </Button>
        </Grid>
        <Grid item className={classes.pager}>
          <Typography>
            {this._getPage()}
            {' / '}
            {numberOfPages}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            disabled={this._getPage() >= numberOfPages}
            component={ButtonLinkTo(
              FeedRoute.makeURL({
                feed: this._getFeed(),
                page: clamp(this._getPage() + 1, 0, numberOfPages),
              }),
            )}
          >
            {t('next')}
          </Button>
        </Grid>
      </Grid>
    ) : null
  }

  private _getPage(): number {
    return this.props.page || 0
  }

  private _getFeed(): MainFeed {
    return this.props.feed || 'top'
  }

  private _getFeedReader(): FeedReader {
    const feed: MainFeed = this._getFeed()

    switch (feed) {
      case 'top':
        return getTopStories
      case 'new':
        return getNewStories
      case 'best':
        return getBestStories
      case 'ask':
        return getAskStories
      case 'show':
        return getShowStories
      case 'job':
        return getJobStories
    }
  }
}

export default withNamespaces('HeadlineList')(withStyles(styles)(HeadlineList))
