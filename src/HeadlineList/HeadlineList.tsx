import { Grid } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
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
  feed?: Feed
}

interface HeadlineListState {
  // page: number
  items?: Items
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  list: {
    padding: 0,
    margin: 0,
    maxWidth: theme.spacing.unit * 120,
    flex: '1 0 0',
  },
})

class HeadlineList extends Component<
  HeadlineListProps & WithStyles,
  HeadlineListState
> {
  public state: HeadlineListState = {}
  private _unsubscriber?: () => void

  public componentDidMount(): void {
    this._subscibe()
  }

  public componentDidUpdate(prevProps: HeadlineListProps): void {
    if (prevProps.feed !== this.props.feed) {
      this._unsubscribe()
      this._subscibe()
    }
  }

  public componentWillUnmount(): void {
    this._unsubscribe()
  }

  public render(): ReactNode {
    const { items }: this['state'] = this.state
    const { classes }: this['props'] = this.props

    if (!items) return null
    return (
      <Grid container justify="center">
        <Grid item component="ul" className={classes.list}>
          {items.map(
            (id: ItemId): ReactNode => (
              <Headline id={id} key={id} />
            ),
          )}
        </Grid>
      </Grid>
    )
  }

  @Bind()
  private _subscriber(snap: Snapshot<Items>): void {
    this.setState({ items: snap.val().slice(0, 30) })
  }

  private _subscibe(): void {
    const feed: Feed = this.props.feed || 'top'

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
