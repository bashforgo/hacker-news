import { Typography } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { Route } from 'react-router'
import FullPage from '../../FullPage/FullPage'
import RouteConfig from '../util/RouteConfig'

class NotFoundRoute implements RouteConfig {
  public makeURL(): never {
    throw new Error('cannot make 404 URL')
  }

  public use(): ReactNode {
    return (
      <Route>
        <FullPage>
          <Typography variant="h2">404</Typography>
        </FullPage>
      </Route>
    )
  }
}

export default new NotFoundRoute()
