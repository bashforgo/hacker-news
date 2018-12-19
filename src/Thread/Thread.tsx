import { Grid, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { Bind, Memoize } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
import { getItem, Item, ItemId, Subscriber, Unsubscriber } from '../api'
import Comment from '../Comment/Comment'
import Headline from '../Headline/Headline'
import WithUpdates, { WithUpdatesFrom } from '../WithUpdates/WithUpdates'

export interface ThreadProps {
  id: ItemId
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    maxWidth: theme.mixins.appMaxWidth,
    padding: theme.spacing.unit,
  },
  spacer: {
    margin: theme.spacing.unit,
  },
})

class Thread extends Component<ThreadProps & WithStyles> {
  public render(): ReactNode {
    const { classes, id }: this['props'] = this.props

    return (
      <Grid container justify="center">
        <Grid
          item
          container
          direction="column"
          className={classes.container}
          component="article"
        >
          <WithUpdates from={this._subscribe(id)}>
            {this._renderItem}
          </WithUpdates>
        </Grid>
      </Grid>
    )
  }

  @Bind()
  private _renderItem(data?: Item): ReactNode {
    if (!data) return null

    return (
      <>
        <Headline id={this.props.id} expanded />
        {this._renderComments(data)}
      </>
    )
  }

  private _renderComments(data: Item): ReactNode {
    if ('kids' in data) {
      return (
        <>
          <span className={this.props.classes.spacer} />
          {data.kids.map((kid: ItemId) => (
            <Comment id={kid} key={kid} />
          ))}
        </>
      )
    }

    return null
  }

  @Bind()
  @Memoize()
  private _subscribe(id: ItemId): WithUpdatesFrom<Item> {
    return (subscriber: Subscriber<Item>): Unsubscriber =>
      getItem(id, subscriber)
  }
}

export default withStyles(styles)(Thread)
