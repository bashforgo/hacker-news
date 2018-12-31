import { DataSnapshot } from '@firebase/database-types'
import { Optional } from '../../types'
import { Feed } from './Feed'

export interface Snapshot<T = unknown> extends DataSnapshot {
  val(): Optional<T>
}
export type Subscriber<T = unknown> = (snap: Snapshot<T>) => void
export type Unsubscriber = () => void
export type FeedReader = (cb: Subscriber<Feed>) => Unsubscriber
