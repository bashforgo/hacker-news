import { Card, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import React, { Component, ReactNode } from 'react'
import { Trans, withNamespaces, WithNamespaces } from 'react-i18next'
import { getItem, Item, ItemId, Snapshot, Story } from '../api'
import Link from '../Link/Link'

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
  link: {
    color: theme.palette.primary.light,
  },
  userLink: {
    display: 'inline-block',
  },
})

class Headline extends Component<
  HeadlineProps & WithStyles & WithNamespaces,
  HeadlineState
> {
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
    const { classes, t }: this['props'] = this.props

    if (!item) return null
    switch (item.type) {
      case 'story': {
        const { title, score, by, url }: Story = item
        return (
          <Card component="li" className={classes.card}>
            <Link
              href={url}
              variant="body1"
              color="inherit"
              className={classes.link}
            >
              {title}
            </Link>
            <Typography variant="caption" color="textSecondary">
              <Trans
                i18nKey="subheader"
                count={score}
                values={{ by }}
                components={[
                  <Link
                    href=""
                    className={classes.userLink}
                    key="link"
                    variant="inherit"
                    color="inherit"
                  >
                    placeholder
                  </Link>,
                ]}
              />
            </Typography>
          </Card>
        )
      }
      default:
        console.log('not implemented')
        return null
    }
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

export default withNamespaces('Headline')(withStyles(styles)(Headline))
