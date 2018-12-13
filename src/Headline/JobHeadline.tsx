import { Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { ReactElement, ReactNode } from 'react'
import { WithNamespaces, withNamespaces } from 'react-i18next'
import { Job } from '../api'
import Link from '../Link/Link'
import Time from '../Time/Time'
import { interleave } from '../util'

export interface JobHeadlineProps {
  item: Job
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
})

function JobHeadline({
  item,
  classes,
  t,
}: JobHeadlineProps & WithStyles & WithNamespaces): ReactElement<{}> {
  const { title, score, by, url, id, time }: Job = item

  const linkTo: (
    key: string,
    href: string,
    children: ReactNode,
  ) => ReactNode = (
    key: string,
    href: string,
    children: ReactNode,
  ): ReactNode => (
    <Link
      variant="inherit"
      color="inherit"
      className={classes.inline}
      {...{ key, href, children }}
    />
  )

  return (
    <>
      <Link
        external={!!url}
        href={url || `/item/${id}`}
        variant="body1"
        className={classes.link}
      >
        {title}
      </Link>
      <Typography
        variant="caption"
        color="textSecondary"
        className={classes.inline}
      >
        {interleave(
          [
            t('points', { count: score }),
            t('by'),
            linkTo('by', `/user/${by}`, by),
            linkTo('time', `/item/${id}`, <Time distance={time} key="time" />),
          ],
          ' ',
        )}
      </Typography>
    </>
  )
}

export default withNamespaces('Headline')(withStyles(styles)(JobHeadline))
