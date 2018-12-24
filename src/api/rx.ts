import { from, Observable, Subscriber, TeardownLogic } from 'rxjs'
import { filter, first, flatMap, map, take, toArray } from 'rxjs/operators'
import { clamp } from '../util'
import { Snapshot, withUnsubscriber } from './firebase'
import { FeedId, Item, ItemId, Items, UserId } from './types'

function getApi$<T>(path: string): Observable<T> {
  return new Observable(
    (subscriber: Subscriber<T>): TeardownLogic => {
      return withUnsubscriber(path, (snap: Snapshot<T>) => {
        subscriber.next(snap.val())
      })
    },
  )
}

export function getItem$(id: ItemId): Observable<Item> {
  return getApi$(`item/${id}`)
}

export function getUserSubmissions$(id: UserId): Observable<Items> {
  return getApi$(`user/${id}/submitted`)
}

interface WithLeft {
  left: number
  items: Item[]
}

export function filterFeed$(
  feed$: Observable<Items>,
  predicate: (item: Item) => boolean,
  limit: number = Infinity,
): Observable<WithLeft> {
  interface WithLength {
    length: number
    item$$: Observable<Observable<Item>>
  }

  return feed$.pipe(
    map((items: Items) => items.map((id: ItemId) => getItem$(id))),
    map(
      (item$s: Array<Observable<Item>>): WithLength => ({
        length: item$s.length,
        item$$: from(item$s),
      }),
    ),
    flatMap(({ length, item$$ }: WithLength) => {
      const { round, sqrt }: typeof Math = Math
      const parallel: number = clamp(round(sqrt(length)), 1, limit)
      let lastFiltered: number = 0

      return item$$.pipe(
        flatMap((item$: Observable<Item>) => item$.pipe(first()), parallel),
        filter((item: Item, index: number) => {
          lastFiltered = index
          return predicate(item)
        }),
        take(limit),
        toArray(),
        map(
          (items: Item[]): WithLeft => ({
            items,
            left: length - lastFiltered - 1,
          }),
        ),
      )
    }),
  )
}
