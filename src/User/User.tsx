import { Grid, Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { Bind, Memoize } from 'lodash-decorators'
import { Star } from 'mdi-material-ui'
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
import Link from '../Link/Link'
import SubmissionsRoute from '../routes/UserRoute/SubmissionsRoute/SubmissionsRoute'
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
      "usernameCaption  username     karma"
      "createdCaption   created      karma"
      "aboutCaption     about        about"
      ".                links        ."
      "submissions      submissions  submissions"`,
    gridTemplateColumns: 'auto 1fr auto',
    gridGap: `${theme.spacing.unit}px`,
    justifyItems: 'start',
    [theme.breakpoints.down('xs')]: {
      gridTemplateAreas: `
        "karma            karma"
        "usernameCaption  username"
        "createdCaption   created"
        "aboutCaption     about"
        ".                links"
        "submissions      submissions"`,
      gridTemplateColumns: 'auto 1fr',
    },
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
  karma: {
    gridArea: 'karma',
    display: 'flex',
    alignItems: 'center',
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
  link: {
    '&.isActive::before': {
      content: '"> "',
    },
  },
  submissions: {
    gridArea: 'submissions',
    justifySelf: 'stretch',
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
    const { id, created, karma, about }: UserType = user

    return (
      <>
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
            <Typography className={classes.karma} variant="h4">
              <Star fontSize="inherit" />
              {karma}
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
            <Typography className={classes.links} component="section">
              <Link
                className={classes.link}
                href={SubmissionsRoute.makeURL({
                  id,
                  filter: 'submissions',
                })}
              >
                {t('submissions')}
              </Link>
              <Link
                className={classes.link}
                href={SubmissionsRoute.makeURL({ id, filter: 'comments' })}
              >
                {t('comments')}
              </Link>
            </Typography>
            <section className={classes.submissions}>
              {SubmissionsRoute.use()}
            </section>
          </Grid>
        </Grid>
      </>
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
