import React, { lazy, ReactNode } from 'react'
import { UserId } from '../../../api/types'
import { AsString, SimpleRouteConfig, withSuspense } from '../../util'

// tslint:disable-next-line:typedef
const Submissions = lazy(() => import('../../../User/Submissions/Submissions'))

export type Filter = 'submissions' | 'comments'
const filters: Filter[] = ['submissions', 'comments']

interface SubmissionsRouteParams {
  id: UserId
  filter: Filter
  amount?: number
}

class SubmissionsRoute extends SimpleRouteConfig<SubmissionsRouteParams> {
  protected URL: string = `/user/:id/:filter(${filters.join(
    '|',
  )})/:amount(\\d+)?`
  protected translateParams({
    id,
    filter,
    amount,
  }: AsString<SubmissionsRouteParams>): ReactNode {
    return withSuspense(
      <Submissions
        amount={amount ? Number(amount) : undefined}
        {...{ id, filter }}
      />,
    )
  }
}

export default new SubmissionsRoute()
