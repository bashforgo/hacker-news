import React, { ReactNode } from 'react'
import { UserId } from '../../api'
import User from '../../User/User'
import SimpleRouteConfig, { AsString } from '../util/SimpleRouteConfig'

interface ItemRouteParams {
  id: UserId
}

class UserRoute extends SimpleRouteConfig<ItemRouteParams> {
  protected URL: string = '/user/:id'
  protected translateParams({ id }: AsString<ItemRouteParams>): ReactNode {
    return <User id={id} />
  }
}

export default new UserRoute()
