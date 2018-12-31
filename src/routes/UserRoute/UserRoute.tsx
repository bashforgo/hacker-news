import React, { lazy, ReactNode } from 'react'
import { UserId } from '../../api/types'
import { AsString, SimpleRouteConfig, withSuspense } from '../util'

// tslint:disable-next-line:typedef
const User = lazy(() => import('../../User/User'))

interface UserRouteParams {
  id: UserId
}

class UserRoute extends SimpleRouteConfig<UserRouteParams> {
  protected URL: string = '/user/:id'
  protected translateParams({ id }: AsString<UserRouteParams>): ReactNode {
    return withSuspense(<User id={id} />)
  }
}

export default new UserRoute()
