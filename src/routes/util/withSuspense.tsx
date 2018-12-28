import { LinearProgress } from '@material-ui/core'
import React, { ReactNode, Suspense } from 'react'

function withSuspense(
  children: ReactNode,
  fallback: ReactNode = <LinearProgress />,
): ReactNode {
  return <Suspense {...{ children, fallback }} />
}

export default withSuspense
