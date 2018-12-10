import app from '@firebase/app'
import { FirebaseApp } from '@firebase/app-types'
import '@firebase/database'
import {
  DataSnapshot,
  FirebaseDatabase,
  Reference,
} from '@firebase/database-types'
import mem from 'mem'
import { Feed, FeedId, Item, ItemId, User, UserId } from './types'

const projectId: string = 'hacker-news'
const authDomain: string = `${projectId}.firebaseio.com`
const databaseURL: string = `https://${authDomain}`

const firebase: Required<FirebaseApp> = app.initializeApp({
  authDomain,
  databaseURL,
  projectId,
}) as Required<FirebaseApp>

const database: FirebaseDatabase = firebase.database()
const api: Reference = database.ref('v0')

export interface Snapshot<T = unknown> extends DataSnapshot {
  val(): T
}
type SnapshotCallback<T = unknown> = (snap: Snapshot<T>) => void
export type Unsubscriber = () => void

function whenExists<T>(
  cb: SnapshotCallback<T>,
): (snap: Snapshot<T> | null) => void {
  return (snap: Snapshot<T> | null): void => {
    if (snap) cb(snap)
  }
}

function withUnsubscriber<T>(
  path: string,
  cb: SnapshotCallback<T>,
): Unsubscriber {
  const ref: Reference = api.child(path)
  const off: ReturnType<Reference['off']> = ref.on('value', whenExists(cb))
  return (): void => {
    ref.off('value', off)
  }
}

export function getItem<T extends Item>(
  id: ItemId,
  cb: SnapshotCallback<T>,
): Unsubscriber {
  return withUnsubscriber(`item/${id}`, cb)
}

export function getUser(id: UserId, cb: SnapshotCallback<User>): Unsubscriber {
  return withUnsubscriber(`user/${id}`, cb)
}

export type FeedReader = (cb: SnapshotCallback<Feed>) => Unsubscriber

const getFeed: (id: FeedId) => FeedReader = mem(
  (id: FeedId): FeedReader => (cb: SnapshotCallback<Feed>): Unsubscriber =>
    withUnsubscriber(id, cb),
)

export const getTopStories: FeedReader = getFeed('topstories')
export const getNewStories: FeedReader = getFeed('newstories')
export const getBestStories: FeedReader = getFeed('beststories')
export const getAskStories: FeedReader = getFeed('askstories')
export const getShowStories: FeedReader = getFeed('showstories')
export const getJobStories: FeedReader = getFeed('jobstories')

export * from './types'
