import React, { ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import FeedRoute from '../FeedRoute/FeedRoute'
import { AbstractRouteConfig } from '../util'

class RootRoute extends AbstractRouteConfig {
  protected URL: string = '/'
  public use(): ReactNode {
    return (
      <Redirect from={this.URL} to={FeedRoute.makeURL({ feed: 'top' })} exact />
    )
  }
}

export default new RootRoute()
