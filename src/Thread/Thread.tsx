import { Grid } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { Bind, Memoize } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { getItem } from '../api'
import { Item, ItemId, Subscriber, Unsubscriber } from '../api/types'
import Comment from '../Comment/Comment'
import EmptyPlaceHolder from '../EmptyPlaceholder/EmptyPlaceHolder'
import Headline from '../Headline/Headline'
import { Optional } from '../types'
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

class Thread extends Component<ThreadProps & WithStyles & WithNamespaces> {
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
  private _renderItem(data?: Optional<Item>): ReactNode {
    if (data === undefined) return null
    if (data === null) return this._empty()

    return (
      <>
        <Headline id={this.props.id} expanded />
        {this._renderComments(data)}
      </>
    )
  }

  private _empty(): ReactNode {
    return <EmptyPlaceHolder message={this.props.t('empty')} />
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

export default withNamespaces('Thread')(withStyles(styles)(Thread))
