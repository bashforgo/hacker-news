import { CircularProgress } from '@material-ui/core'
import React, { Component, ReactNode } from 'react'
import FullPage from '../FullPage/FullPage'

class LoadingPage extends Component {
  public render(): ReactNode {
    return (
      <FullPage>
        <CircularProgress size={80} />
      </FullPage>
    )
  }
}

export default LoadingPage
