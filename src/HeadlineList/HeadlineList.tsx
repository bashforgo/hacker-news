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
import { Link } from 'react-router-dom'
import {
  getAskStories,
  getBestStories,
  getJobStories,
  getNewStories,
  getShowStories,
  getTopStories,
  ItemId,
  Items,
  Snapshot,
} from '../api'
import Headline from '../Headline/Headline'

export type Feed = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job'

interface HeadlineListProps {
  page?: number
  feed?: Feed
}

interface HeadlineListState {
  displayItems?: Items
  items: Items
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
  HeadlineListProps & WithStyles,
  HeadlineListState
> {
  public state: HeadlineListState = { items: [] }
  private _unsubscriber?: () => void

  public componentDidMount(): void {
    this._subscribe()
  }

  public componentDidUpdate(
    prevProps: HeadlineListProps,
    prevState: HeadlineListState,
  ): void {
    if (prevProps.feed !== this.props.feed) {
      this._unsubscribe()
      this._subscribe()
    }

    if (
      prevProps.page !== this.props.page ||
      prevState.items !== this.state.items
    ) {
      const begin: number = this._getPage() * PAGE_SIZE
      const end: number = begin + PAGE_SIZE

      this.setState({ displayItems: this.state.items.slice(begin, end) })
    }
  }

  public componentWillUnmount(): void {
    this._unsubscribe()
  }

  public render(): ReactNode {
    const { displayItems }: this['state'] = this.state
    const { classes }: this['props'] = this.props

    if (!displayItems) return null
    return (
      <Grid container justify="center">
        <Grid item component="ul" className={classes.list}>
          {displayItems.map(
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
        >
          <Grid item>
            <Button
              disabled={this._getPage() <= 0}
              component={ButtonLinkTo(
                `/${this._getFeed()}/${this._getPage() - 1}`,
              )}
            >
              prev
            </Button>
          </Grid>
          <Grid item className={classes.pager}>
            <Typography>
              {this._getPage()}
              {' / '}
              {this._getMaxPage()}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={this._getPage() >= this._getMaxPage()}
              component={ButtonLinkTo(
                `/${this._getFeed()}/${this._getPage() + 1}`,
              )}
            >
              next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  private _getPage(): number {
    return this.props.page || 0
  }

  private _getMaxPage(): number {
    return Math.floor((this.state.items.length - 1) / PAGE_SIZE)
  }

  private _getFeed(): Feed {
    return this.props.feed || 'top'
  }

  @Bind()
  private _subscriber(snap: Snapshot<Items>): void {
    this.setState({ items: snap.val() })
  }

  private _subscribe(): void {
    const feed: Feed = this._getFeed()

    switch (feed) {
      case 'top':
        this._unsubscriber = getTopStories(this._subscriber)
        break
      case 'new':
        this._unsubscriber = getNewStories(this._subscriber)
        break
      case 'best':
        this._unsubscriber = getBestStories(this._subscriber)
        break
      case 'ask':
        this._unsubscriber = getAskStories(this._subscriber)
        break
      case 'show':
        this._unsubscriber = getShowStories(this._subscriber)
        break
      case 'job':
        this._unsubscriber = getJobStories(this._subscriber)
        break
    }
  }

  private _unsubscribe(): void {
    if (this._unsubscriber) this._unsubscriber()
    delete this._unsubscriber
  }
}

export default withStyles(styles)(HeadlineList)
