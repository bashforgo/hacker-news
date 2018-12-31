import React, { lazy, ReactNode } from 'react'
import { AsString, SimpleRouteConfig, withSuspense } from '../util'

// tslint:disable-next-line:typedef
const HeadlineList = lazy(() => import('../../HeadlineList/HeadlineList'))

export type MainFeed = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job'
export const feeds: MainFeed[] = ['top', 'new', 'best', 'ask', 'show', 'job']

interface FeedRouteParams {
  feed: MainFeed
  page?: number
}

class FeedRoute extends SimpleRouteConfig<FeedRouteParams> {
  protected URL: string = `/:feed(${feeds.join('|')})/:page(\\d+)?`
  protected translateParams({
    feed,
    page,
  }: AsString<FeedRouteParams>): ReactNode {
    return withSuspense(<HeadlineList feed={feed} page={Number(page || '0')} />)
  }
}

export default new FeedRoute()
