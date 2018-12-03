import { Card } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'
import { getItem, Item, ItemId, Snapshot } from '../api'
import JobHeadline from './JobHeadline'
import StoryHeadline from './StoryHeadline'

interface HeadlineProps {
  id: ItemId
}

interface HeadlineState {
  item?: Item
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  card: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
})

class Headline extends Component<HeadlineProps & WithStyles, HeadlineState> {
  public state: HeadlineState = {}
  private _unsubscriber?: () => void

  public componentDidMount(): void {
    this._subscibe()
  }

  public componentDidUpdate(prevProps: HeadlineProps): void {
    if (prevProps.id !== this.props.id) {
      this._unsubscribe()
      this._subscibe()
    }
  }

  public componentWillUnmount(): void {
    this._unsubscribe()
  }

  public render(): ReactNode {
    const { item }: this['state'] = this.state
    const { classes }: this['props'] = this.props
    let render: ReactNode = null

    if (!item) return null
    switch (item.type) {
      case 'story':
        render = <StoryHeadline item={item} />
        break
      case 'job':
        render = <JobHeadline item={item} />
        break
      case 'poll':
        render = <StoryHeadline item={item} />
        break
      case 'pollopt':
        return null
      case 'comment':
        return null
      default:
        throw new Error(`unknown item type ${(item as Item).type}`)
    }

    return (
      <Card component="li" className={classes.card}>
        {render}
      </Card>
    )
  }

  private _subscibe(): void {
    this._unsubscriber = getItem(
      this.props.id,
      (snap: Snapshot<Item>): void => {
        this.setState({ item: snap.val() })
      },
    )
  }

  private _unsubscribe(): void {
    if (this._unsubscriber) this._unsubscriber()
    delete this._unsubscriber
  }
}

export default withStyles(styles)(Headline)
