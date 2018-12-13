import {
  StyleRules,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import classnames from 'classnames'
import React, { Component, ReactNode } from 'react'

interface ContentHtmlProps {
  className?: string
  children: string
}

const styles: StyleRulesCallback = (theme: Theme): StyleRules => ({
  content: {
    ...theme.typography.body2,
    margin: 0,
    width: '100%',
    overflow: 'auto',
    '& *': {
      margin: 0,
    },
    '& p': {
      ...theme.typography.body2,
      marginTop: theme.spacing.unit / 2,
      maxWidth: '100%',
      overflow: 'auto',
    },
    '& pre, & code': {
      ...theme.typography.body2,
      maxWidth: '100%',
      overflow: 'auto',
      fontFamily: 'monospace',
    },
    '& a': {
      ...theme.typography.body2,
      color: theme.palette.link.default,
      display: 'inline-block',
      maxWidth: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      verticalAlign: 'top',
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      '&:focus, &:active, &:visited': {
        color: theme.palette.link.active,
        outline: 'none',
      },
    },
  },
})

class ContentHtml extends Component<ContentHtmlProps & WithStyles> {
  public render(): ReactNode {
    const { classes, className }: this['props'] = this.props

    return (
      <div
        className={classnames(classes.content, className)}
        dangerouslySetInnerHTML={{ __html: this.props.children }}
      />
    )
  }
}

export default withStyles(styles)(ContentHtml)
