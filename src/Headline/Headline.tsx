import { Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind, Memoize } from 'lodash-decorators'
import React, { Component, ComponentType, ReactNode } from 'react'
import { WithNamespaces, withNamespaces } from 'react-i18next'
import {
  Comment,
  getItem,
  Item,
  ItemId,
  Job,
  Poll,
  PollOption,
  Story,
  Subscriber,
  Unsubscriber,
} from '../api'
import ContentHtml from '../ContentHtml/ContentHtml'
import Link from '../Link/Link'
import ItemRoute from '../routes/ItemRoute/ItemRoute'
import Time from '../Time/Time'
import { interleave } from '../util/interleave'
import WithUpdates, { WithUpdatesFrom } from '../WithUpdates/WithUpdates'

interface HeadlineProps {
  id: ItemId
  expanded?: true
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  link: {
    color: theme.palette.link.default,
    '&:focus, &:active, &:visited': {
      color: theme.palette.link.active,
      outline: 'none',
    },
  },
  inline: {
    display: 'inline-block',
  },
  expandedText: {
    marginTop: theme.spacing.unit,
  },
  pollOptions: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

type Core = Story | Job | Poll
class Headline extends Component<HeadlineProps & WithStyles & WithNamespaces> {
  public render(): ReactNode {
    return (
      <WithUpdates from={this._subscribe(this.props.id)}>
        {this._renderItem}
      </WithUpdates>
    )
  }

  @Bind()
  @Memoize()
  private _subscribe(id: ItemId): WithUpdatesFrom<Item> {
    return (subscriber: Subscriber<Item>): Unsubscriber =>
      getItem(id, subscriber)
  }

  @Bind()
  private _renderItem(item?: Item): ReactNode {
    return item ? this._item(item) : this._empty()
  }

  private _empty(): ReactNode {
    return (
      <>
        <Typography variant="body1">???</Typography>
        {this._caption(['???'])}
      </>
    )
  }

  private _item(item: Item): ReactNode {
    switch (item.type) {
      case 'story':
        return this._core(item)
      case 'job':
        return this._core(item)
      case 'poll':
        return this._core(item)
      case 'pollopt':
        return this._pollOption(item)
      case 'comment':
        return this._comment(item)
      default:
        throw new Error(`unknown item type ${(item as Item).type}`)
    }
  }

  private _core(item: Core): ReactNode {
    return (
      <>
        {this._headerToUrlOrComments(item)}
        {this._deriveCaption(item)}
        {this._maybeText(item, true)}
        {this._maybePollOptions(item)}
      </>
    )
  }

  private _pollOption({ text, score, poll }: PollOption): ReactNode {
    const { t }: this['props'] = this.props

    return (
      <>
        <Typography variant="body1">{text}</Typography>
        {this._caption([
          t('points', { count: score }),
          '|',
          this._captionLink(
            'parentPoll',
            ItemRoute.makeURL({ id: poll }),
            t('poll'),
          ),
        ])}
      </>
    )
  }

  private _comment(comment: Comment): ReactNode {
    const { t }: this['props'] = this.props
    const { by, id, time, parent }: Comment = comment

    return (
      <>
        {this._caption([
          this._captionLink('by', `/user/${by}`, by),
          this._captionLink(
            'time',
            ItemRoute.makeURL({ id }),
            <Time distance={time} key="time" />,
          ),
          '|',
          this._captionLink(
            'parent',
            ItemRoute.makeURL({ id: parent }),
            t('parent'),
          ),
        ])}
        {this._maybeText(comment, false)}
      </>
    )
  }

  private _header(
    external: boolean,
    href: string,
    children: ReactNode,
  ): ReactNode {
    const { classes }: this['props'] = this.props

    return (
      <Link
        variant="body1"
        className={classes.link}
        {...{ external, href, children }}
      />
    )
  }

  private _headerToUrlOrComments(item: Core): ReactNode {
    const { id, title }: typeof item = item
    return 'url' in item && item.url
      ? this._header(true, item.url, title)
      : this._header(false, ItemRoute.makeURL({ id }), title)
  }

  private _caption(content: ReactNode[]): ReactNode {
    const { classes }: this['props'] = this.props

    return (
      <Typography
        variant="caption"
        color="textSecondary"
        className={classes.inline}
      >
        {interleave(content, ' ')}
      </Typography>
    )
  }

  private _captionLink(
    key: string,
    href: string,
    children: ReactNode,
  ): ReactNode {
    const { classes }: this['props'] = this.props

    return <Link className={classes.inline} {...{ key, href, children }} />
  }

  private _deriveCaption(item: Core): ReactNode {
    const { t }: this['props'] = this.props
    const { score, by, time, id }: typeof item = item

    return this._caption([
      t('points', { count: score }),
      t('by'),
      this._captionLink('by', `/user/${by}`, by),
      this._captionLink(
        'time',
        ItemRoute.makeURL({ id }),
        <Time distance={time} key="time" />,
      ),
      ...('descendants' in item
        ? [
            '|',
            this._captionLink(
              'comments',
              ItemRoute.makeURL({ id }),
              t('comments', { count: item.descendants }),
            ),
          ]
        : []),
    ])
  }

  private _maybeText(item: Item, spaced: boolean): ReactNode {
    const { expanded, classes }: this['props'] = this.props

    return expanded && 'text' in item ? (
      <ContentHtml className={spaced ? classes.expandedText : ''}>
        {item.text}
      </ContentHtml>
    ) : null
  }

  private _maybePollOptions(item: Core): ReactNode {
    const { expanded, classes }: this['props'] = this.props

    return expanded && 'parts' in item ? (
      <section className={classes.pollOptions}>
        {item.parts.map(
          (part: ItemId): ReactNode => (
            <Self id={part} key={part} />
          ),
        )}
      </section>
    ) : null
  }

  private ___(): ReactNode {
    return null
  }
}

const Self: ComponentType<HeadlineProps> = withNamespaces('Headline')(
  withStyles(styles)(Headline),
)
export default Self
