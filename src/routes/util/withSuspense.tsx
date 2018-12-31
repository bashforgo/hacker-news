import { LinearProgress } from '@material-ui/core'
import React, { ReactNode, Suspense } from 'react'

export function withSuspense(
  children: ReactNode,
  fallback: ReactNode = <LinearProgress />,
): ReactNode {
  return <Suspense {...{ children, fallback }} />
}
