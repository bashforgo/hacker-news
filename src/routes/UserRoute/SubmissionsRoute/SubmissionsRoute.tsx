import React, { ReactNode } from 'react'
import { UserId } from '../../../api/types'
import Submissions from '../../../User/Submissions/Submissions'
import SimpleRouteConfig, { AsString } from '../../util/SimpleRouteConfig'

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
    return (
      <Submissions
        amount={amount ? Number(amount) : undefined}
        {...{ id, filter }}
      />
    )
  }
}

export default new SubmissionsRoute()
