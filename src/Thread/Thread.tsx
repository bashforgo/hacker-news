import { Grid, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { Bind } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
import {
  FeedReader,
  getItem,
  Item,
  ItemId,
  Snapshot,
  Unsubscriber,
} from '../api'
import Comment from '../Comment/Comment'
import Headline from '../Headline/Headline'
import WithUpdates from '../WithUpdates/WithUpdates'

export interface ThreadProps {
  id: ItemId
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    maxWidth: theme.spacing.unit * 120,
    padding: theme.spacing.unit,
  },
  spacer: {
    margin: theme.spacing.unit,
  },
})

class Thread extends Component<ThreadProps & WithStyles> {
  public render(): ReactNode {
    const { classes }: this['props'] = this.props

    return (
      <Grid container justify="center">
        <Grid item container direction="column" className={classes.container}>
          <WithUpdates from={this._subscribe}>{this._renderItem}</WithUpdates>
        </Grid>
      </Grid>
    )
  }

  @Bind()
  private _renderItem(data?: Item): ReactNode {
    if (!data) return null

    return (
      <>
        <Headline id={this.props.id} wrapped={false} />
        {this._renderText(data)}
        {this._renderComments(data)}
      </>
    )
  }

  private _renderText(data: Item): ReactNode {
    if ('text' in data) {
      return (
        <>
          <span className={this.props.classes.spacer} />
          <Typography dangerouslySetInnerHTML={{ __html: data.text }} />
        </>
      )
    }

    return null
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
  private _subscribe(subscriber: (snap: Snapshot<Item>) => void): Unsubscriber {
    return getItem(this.props.id, subscriber)
  }
}

export default withStyles(styles)(Thread)
