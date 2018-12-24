import React, { ReactNode } from 'react'
import { UserId } from '../../api'
import User from '../../User/User'
import SimpleRouteConfig, { AsString } from '../util/SimpleRouteConfig'

interface UserRouteParams {
  id: UserId
}

class UserRoute extends SimpleRouteConfig<UserRouteParams> {
  protected URL: string = '/user/:id'
  protected translateParams({ id }: AsString<UserRouteParams>): ReactNode {
    return <User id={id} />
  }
}

export default new UserRoute()
