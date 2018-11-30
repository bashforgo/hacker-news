import { Grid } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'
import { getNewStories, ItemId, Items, Snapshot } from '../api'
import Headline from '../Headline/Headline'

interface HeadlineListProps {
  feed?: string
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

  // public componentDidUpdate(prevProps: HeadlineListProps): void {
  //   if (prevProps.id !== this.props.id) {
  //     this._unsubscribe()
  //     this._subscibe()
  //   }
  // }

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

  private _subscibe(): void {
    this._unsubscriber = getNewStories(
      (snap: Snapshot<Items>): void => {
        this.setState({ items: snap.val().slice(0, 30) })
      },
    )
  }

  private _unsubscribe(): void {
    if (this._unsubscriber) this._unsubscriber()
    delete this._unsubscriber
  }
}

export default withStyles(styles)(HeadlineList)
