import React, { Component, ReactNode, Suspense } from 'react'
import { Optional } from '../types'

interface OnDemandProps {
  render: boolean
  children: ReactNode
  fallback?: ReactNode
}

interface OnDemandState {
  shouldRender: boolean
}

class OnDemand extends Component<OnDemandProps, OnDemandState> {
  public static getDerivedStateFromProps(
    nextProps: OnDemandProps,
    prevState: OnDemandState,
  ): Optional<OnDemandState> {
    if (!prevState.shouldRender && nextProps.render) {
      return { shouldRender: true }
    }

    return null
  }

  public state: OnDemandState = { shouldRender: false }

  public render(): ReactNode {
    const { fallback, children }: this['props'] = this.props

    return (
      <Suspense fallback={fallback || ''}>
        {this.state.shouldRender && children}
      </Suspense>
    )
  }
}

export default OnDemand
