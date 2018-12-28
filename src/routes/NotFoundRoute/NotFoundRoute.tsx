import { Typography } from '@material-ui/core'
import React, { lazy, ReactNode } from 'react'
import { Route } from 'react-router-dom'
import RouteConfig from '../util/RouteConfig'
import withSuspense from '../util/withSuspense'

// tslint:disable:typedef
const FullPage = lazy(() => import('../../FullPage/FullPage'))

class NotFoundRoute implements RouteConfig {
  public makeURL(): never {
    throw new Error('cannot make 404 URL')
  }

  public use(): ReactNode {
    return withSuspense(
      <Route>
        <FullPage>
          <Typography variant="h2">404</Typography>
        </FullPage>
      </Route>,
    )
  }
}

export default new NotFoundRoute()
