import React, { lazy, ReactNode } from 'react'
import { ItemId } from '../../api/types'
import SimpleRouteConfig, { AsString } from '../util/SimpleRouteConfig'
import withSuspense from '../util/withSuspense'

// tslint:disable-next-line:typedef
const Thread = lazy(() => import('../../Thread/Thread'))

interface ItemRouteParams {
  id: ItemId
}

class ItemRoute extends SimpleRouteConfig<ItemRouteParams> {
  protected URL: string = '/item/:id(\\d+)'
  protected translateParams({ id }: AsString<ItemRouteParams>): ReactNode {
    return withSuspense(<Thread id={Number(id)} />)
  }
}

export default new ItemRoute()
