import { EMPTY, from, Observable, Subscriber, TeardownLogic } from 'rxjs'
import { filter, first, flatMap, map, take, toArray } from 'rxjs/operators'
import { Optional } from '../types'
import { clamp } from '../util'
import { withUnsubscriber } from './'
import { Item, ItemId, Items, Snapshot, UserId } from './types'

function getApi$<T>(path: string): Observable<Optional<T>> {
  return new Observable(
    (subscriber: Subscriber<Optional<T>>): TeardownLogic => {
      return withUnsubscriber(path, (snap: Snapshot<T>) => {
        subscriber.next(snap.val())
      })
    },
  )
}

export function getItem$(id: ItemId): Observable<Optional<Item>> {
  return getApi$(`item/${id}`)
}

export function getUserSubmissions$(id: UserId): Observable<Optional<Items>> {
  return getApi$(`user/${id}/submitted`)
}

interface WithLeft {
  left: number
  items: Item[]
}

export function filterFeed$(
  feed$: Observable<Optional<Items>>,
  predicate: (item: Item) => boolean,
  limit: number = Infinity,
): Observable<WithLeft> {
  interface WithLength {
    length: number
    item$$: Observable<Observable<Optional<Item>>>
  }

  return feed$.pipe(
    map((items: Optional<Items>) =>
      items ? items.map((id: ItemId) => getItem$(id)) : [],
    ),
    map(
      (item$s: Array<Observable<Optional<Item>>>): WithLength => ({
        length: item$s.length,
        item$$: from(item$s),
      }),
    ),
    flatMap(({ length, item$$ }: WithLength) => {
      const { round, sqrt }: typeof Math = Math
      const parallel: number = clamp(round(sqrt(length)), 1, limit)
      let lastFiltered: number = 0

      return item$$.pipe(
        flatMap(
          (item$: Observable<Optional<Item>>) =>
            item$ ? item$.pipe(first()) : EMPTY,
          parallel,
        ),
        filter(
          (item: Optional<Item>, index: number): item is Item => {
            lastFiltered = index
            return !!item && predicate(item)
          },
        ),
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
