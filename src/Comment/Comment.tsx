import { Grid, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind, Memoize } from 'lodash-decorators'
import React, { Component, ComponentType, ReactNode } from 'react'
import {
  Comment as CommentType,
  getItem,
  ItemId,
  Subscriber,
  Unsubscriber,
} from '../api'
import ContentHtml from '../ContentHtml/ContentHtml'
import Link from '../Link/Link'
import Time from '../Time/Time'
import WithUpdates, { WithUpdatesFrom } from '../WithUpdates/WithUpdates'

interface CommentProps {
  id: ItemId
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  root: {
    '& + &, & &': {
      marginTop: theme.spacing.unit,
    },
  },
  inline: {
    display: 'inline-block',
  },
  bar: {
    // reset
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    padding: 0,
    outline: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    '&::-moz-focus-inner': {
      border: 0,
      padding: 0,
    },
    // end reset
    width: '100%',
    height: '100%',
    minWidth: 0,
    minHeight: 0,
    boxShadow: theme.shadows[0],
    cursor: 'pointer',
    borderLeft: `${theme.spacing.unit / 4}px solid ${grey[400]}`,
    '&:hover, &:focus, &:active': {
      borderLeftColor: grey[600],
    },
  },
  barContainer: {
    flex: `0 0 ${theme.spacing.unit * 1.5}px`,
    marginRight: theme.spacing.unit * 0.25,
  },
  content: {
    flex: `1 0 0`,
    maxWidth: `calc(100% - ${theme.spacing.unit * (1.5 + 0.25)}px)`,
  },
})

class Comment extends Component<CommentProps & WithStyles> {
  public render(): ReactNode {
    return (
      <WithUpdates from={this._subscribe(this.props.id)}>
        {this._renderComment}
      </WithUpdates>
    )
  }

  @Bind()
  private _renderComment(comment?: CommentType): ReactNode {
    if (!comment) return null
    const { by, text, time, dead, deleted }: CommentType = comment
    if (dead || deleted) return null
    const { classes }: this['props'] = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item className={classes.barContainer}>
          <button className={classes.bar} />
        </Grid>
        <Grid item className={classes.content}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.inline}
          >
            {[
              by,
              ' ',
              <Link
                key="time"
                href={`/item/${this.props.id}`}
                className={classes.inline}
              >
                <Time distance={time} />
              </Link>,
            ]}
          </Typography>
          <ContentHtml>{text}</ContentHtml>
          {this._renderKids(comment)}
        </Grid>
      </Grid>
    )
  }

  private _renderKids(comment: CommentType): ReactNode {
    return comment.kids
      ? comment.kids.map((kid: ItemId) => <Self key={kid} id={kid} />)
      : null
  }

  @Bind()
  @Memoize()
  private _subscribe(id: ItemId): WithUpdatesFrom<CommentType> {
    return (subscriber: Subscriber<CommentType>): Unsubscriber =>
      getItem(id, subscriber)
  }
}

const Self: ComponentType<CommentProps> = withStyles(styles)(Comment)
export default Self
