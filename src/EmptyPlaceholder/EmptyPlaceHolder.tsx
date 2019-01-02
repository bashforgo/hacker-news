import { Grid, Typography } from '@material-ui/core'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'

interface EmptyPlaceholderProps {
  message: string
}

class EmptyPlaceholder extends Component<
  EmptyPlaceholderProps & WithNamespaces
> {
  public render(): ReactNode {
    const { message, t }: this['props'] = this.props

    return (
      <Grid container spacing={16} alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h6">{message}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" aria-label={t('shrugLabel')}>
            {t('shared:shrug')}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withNamespaces('EmptyPlaceholder')(EmptyPlaceholder)
