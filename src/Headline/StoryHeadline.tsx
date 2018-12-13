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
import { Poll, Story } from '../api'
import Link from '../Link/Link'
import Time from '../Time/Time'
import { interleave } from '../util'

export interface StoryHeadlineProps {
  item: Story | Poll
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

function StoryHeadline({
  item,
  classes,
  t,
}: StoryHeadlineProps & WithStyles & WithNamespaces): ReactElement<{}> {
  const { title, score, by, descendants, id, time }: Story | Poll = item
  const external: boolean = item.type === 'story' && !!item.url
  const url: string = external ? (item as Story).url : `/item/${id}`
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
            linkTo('by', `/user/${by}`, by),
            linkTo('time', `/item/${id}`, <Time distance={time} key="time" />),
            '|',
            linkTo(
              'comments',
              `/item/${id}`,
              t('comments', { count: descendants }),
            ),
          ],
          ' ',
        )}
      </Typography>
    </>
  )
}

export default withNamespaces('Headline')(withStyles(styles)(StoryHeadline))
