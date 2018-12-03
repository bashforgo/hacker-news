import { Typography } from '@material-ui/core'
import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import React, { ReactElement } from 'react'
import { WithNamespaces, withNamespaces } from 'react-i18next'
import { Job } from '../api'
import Link from '../Link/Link'
import { interleave } from '../util'

export interface JobHeadlineProps {
  item: Job
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  link: {
    color: theme.palette.primary.light,
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
            <Link
              key="by"
              href={`/user/${by}`}
              variant="inherit"
              color="inherit"
              className={classes.inline}
            >
              {by}
            </Link>,
            t('time', { time }),
          ],
          ' ',
        )}
      </Typography>
    </>
  )
}

export default withNamespaces('Headline')(withStyles(styles)(JobHeadline))
