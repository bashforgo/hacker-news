import React, { ReactNode } from 'react'
import HeadlineList from '../../HeadlineList/HeadlineList'
import SimpleRouteConfig, { AsString } from '../util/SimpleRouteConfig'

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
    return <HeadlineList feed={feed} page={Number(page || '0')} />
  }
}

export default new FeedRoute()
