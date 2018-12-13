import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'

interface TimeProps {
  distance: number
}

class Time extends Component<TimeProps & WithNamespaces> {
  public render(): ReactNode {
    const { distance, t }: this['props'] = this.props

    return (
      <time dateTime={new Date(distance * 1000).toISOString()}>
        {t('shared:timeDistance', { time: distance })}
      </time>
    )
  }
}

export default withNamespaces()(Time)
