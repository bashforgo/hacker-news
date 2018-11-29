import { DateTime, ItemId, Items, UserId } from './primitives'

export interface BaseItem {
  type: Item['type']
  by: UserId
  id: ItemId
  time: DateTime
}

export interface Story extends BaseItem {
  type: 'story'
  descendants: number
  kids: Items
  score: number
  title: string
  url: string
}

export interface Comment extends BaseItem {
  type: 'comment'
  kids: Items
  parent: ItemId
  text: string
}

export interface Job extends BaseItem {
  type: 'job'
  score: number
  text: string
  title: string
  url: string
}

export interface Poll extends BaseItem {
  type: 'poll'
  descendants: number
  kids: Items
  parts: Items
  score: number
  text: string
  title: string
}

export interface PollOption extends BaseItem {
  type: 'pollopt'
  descendants: number
  poll: ItemId
  score: number
  text: string
}

export type Item = Story | Comment | Job | Poll | PollOption
