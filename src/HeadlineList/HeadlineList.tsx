import { Button, Grid, Typography } from '@material-ui/core'
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
import WithUpdates from '../WithUpdates/WithUpdates'

export type Feed = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job'

interface HeadlineListProps {
  page?: number
  feed?: Feed
}

const PAGE_SIZE: number = 30
const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  list: {
    padding: 0,
    margin: 0,
    maxWidth: theme.spacing.unit * 120,
    flexGrow: 1,
  },
  pager: {
    display: 'flex',
    alignItems: 'center',
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
      <Grid container justify="center">
        <Grid item component="ul" className={classes.list}>
          {items.map(
            (id: ItemId): ReactNode => (
              <Headline id={id} key={id} />
            ),
          )}
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignContent="center"
          spacing={8}
        >
          <Grid item>
            <Button
              disabled={this._getPage() <= 0}
              component={ButtonLinkTo(
                `/${this._getFeed()}/${this._getPage() - 1}`,
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
                `/${this._getFeed()}/${this._getPage() + 1}`,
              )}
            >
              {t('next')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  private _getPage(): number {
    return this.props.page || 0
  }

  private _getFeed(): Feed {
    return this.props.feed || 'top'
  }

  private _getFeedReader(): FeedReader {
    const feed: Feed = this._getFeed()

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
