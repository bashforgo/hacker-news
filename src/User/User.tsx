import { Grid, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind, Memoize } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import {
  getUser,
  Subscriber,
  Unsubscriber,
  User as UserType,
  UserId,
} from '../api'
import ContentHtml from '../ContentHtml/ContentHtml'
import WithUpdates, { WithUpdatesFrom } from '../WithUpdates/WithUpdates'

interface UserProps {
  id: UserId
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  container: {
    maxWidth: theme.mixins.appMaxWidth,
    width: '100%',
    padding: theme.spacing.unit,
    display: 'grid',
    gridTemplateAreas: `
      "usernameCaption  username"
      "createdCaption   created"
      "aboutCaption     about"
      ".                links"`,
    gridTemplateColumns: 'auto 1fr',
    gridGap: `${theme.spacing.unit}px`,
  },
  usernameCaption: {
    gridArea: 'usernameCaption',
  },
  username: {
    gridArea: 'username',
  },
  createdCaption: {
    gridArea: 'createdCaption',
  },
  created: {
    gridArea: 'created',
  },
  aboutCaption: {
    gridArea: 'aboutCaption',
  },
  about: {
    gridArea: 'about',
  },
  links: {
    gridArea: 'links',
  },
})

class User extends Component<UserProps & WithStyles & WithNamespaces> {
  public render(): ReactNode {
    return (
      <WithUpdates from={this._subscribe(this.props.id)}>
        {this._renderUser}
      </WithUpdates>
    )
  }

  @Bind()
  private _renderUser(user: UserType): ReactNode {
    if (!user) return null
    const { classes, t }: this['props'] = this.props
    const { id, created, about }: UserType = user

    return (
      <Grid container justify="center">
        <Grid item className={classes.container}>
          <Typography className={classes.usernameCaption}>
            {t('usernameCaption')}
          </Typography>
          <Typography
            className={classes.username}
            aria-labelledby={classes.usernameCaption}
          >
            {id}
          </Typography>
          <Typography className={classes.createdCaption}>
            {t('createdCaption')}
          </Typography>
          <Typography
            className={classes.created}
            aria-labelledby={classes.createdCaption}
          >
            {t('shared:date', { date: created })}
          </Typography>
          <Typography className={classes.aboutCaption}>
            {t('aboutCaption')}
          </Typography>
          <ContentHtml
            className={classes.about}
            aria-labelledby={classes.aboutCaption}
          >
            {about}
          </ContentHtml>
          <section className={classes.links} />
        </Grid>
      </Grid>
    )
  }

  @Bind()
  @Memoize()
  private _subscribe(id: UserId): WithUpdatesFrom<UserType> {
    return (subscriber: Subscriber<UserType>): Unsubscriber =>
      getUser(id, subscriber)
  }
}

export default withNamespaces('User')(withStyles(styles)(User))
