import React, { ReactNode } from 'react'
import { ItemId } from '../../api'
import Thread from '../../Thread/Thread'
import SimpleRouteConfig, { AsString } from '../util/SimpleRouteConfig'

interface ItemRouteParams {
  id: ItemId
}

class ItemRoute extends SimpleRouteConfig<ItemRouteParams> {
  protected URL: string = '/item/:id(\\d+)'
  protected translateParams({ id }: AsString<ItemRouteParams>): ReactNode {
    return <Thread id={Number(id)} />
  }
}

export default new ItemRoute()
