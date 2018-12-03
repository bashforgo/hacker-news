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
import { Poll, Story } from '../api'
import Link from '../Link/Link'
import { interleave } from '../util'

export interface StoryHeadlineProps {
  item: Story | Poll
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  link: {
    color: theme.palette.primary.light,
  },
  inline: {
    display: 'inline-block',
  },
})

function StoryHeadline({
  item,
  classes,
  t,
}: StoryHeadlineProps & WithStyles & WithNamespaces): ReactElement<{}> {
  const { title, score, by, descendants, id, time }: Story | Poll = item
  const external: boolean = item.type === 'story' && !!item.url
  const url: string = external ? (item as Story).url : `/item/${id}`
  return (
    <>
      <Link
        external={external}
        href={url}
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
            '|',
            <Link
              key="comments"
              href={`/item/${id}`}
              variant="inherit"
              color="inherit"
              className={classes.inline}
            >
              {t('comments', { count: descendants })}
            </Link>,
          ],
          ' ',
        )}
      </Typography>
    </>
  )
}

export default withNamespaces('Headline')(withStyles(styles)(StoryHeadline))
