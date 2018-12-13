import { Card, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
import { getItem, Item, ItemId, Snapshot } from '../api'
import WithUpdates from '../WithUpdates/WithUpdates'
import JobHeadline from './JobHeadline'
import StoryHeadline from './StoryHeadline'

interface HeadlineProps {
  id: ItemId
  wrapped?: boolean
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  card: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
})

class Headline extends Component<HeadlineProps & WithStyles> {
  public static defaultProps: Partial<HeadlineProps> = {
    wrapped: true,
  }

  public render(): ReactNode {
    return <WithUpdates from={this._subscribe}>{this._renderItem}</WithUpdates>
  }

  @Bind()
  private _subscribe(subscriber: (snap: Snapshot<Item>) => void): () => void {
    return getItem(this.props.id, subscriber)
  }

  @Bind()
  private _renderItem(item?: Item): ReactNode {
    const content: ReactNode = item ? this._item(item) : this._empty()

    return this.props.wrapped ? (
      <Card component="li" className={this.props.classes.card}>
        {content}
      </Card>
    ) : (
      content
    )
  }

  private _empty(): ReactNode {
    return (
      <>
        <Typography variant="body1">???</Typography>
        <Typography variant="caption" color="textSecondary">
          ???
        </Typography>
      </>
    )
  }

  private _item(item: Item): ReactNode {
    switch (item.type) {
      case 'story':
        return <StoryHeadline item={item} />
      case 'job':
        return <JobHeadline item={item} />
      case 'poll':
        return <StoryHeadline item={item} />
      case 'pollopt':
        return null
      case 'comment':
        return null
      default:
        throw new Error(`unknown item type ${(item as Item).type}`)
    }
  }
}

export default withStyles(styles)(Headline)
