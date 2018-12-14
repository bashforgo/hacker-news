import React, { Component, ReactNode } from 'react'
import { arrayEquals } from '../util'

interface PaginatedProps<T = unknown> {
  data: T[]
  page: number
  pageSize: number
  children: (paginated: T[], numberOfPages: number) => ReactNode
}

interface PaginatedState<T = unknown> {
  paginated: T[]
}

function paginate<T = unknown>({
  data,
  page,
  pageSize,
}: PaginatedProps<T>): T[] {
  const begin: number = page * pageSize
  return data.slice(begin, begin + pageSize)
}

class Paginated<T = unknown> extends Component<
  PaginatedProps<T>,
  PaginatedState<T>
> {
  public static getDerivedStateFromProps<T = unknown>(
    nextProps: PaginatedProps<T>,
    { paginated }: PaginatedState<T>,
  ): Partial<PaginatedState<T>> | null {
    const nextPaginated: T[] = paginate(nextProps)

    return arrayEquals(paginated, nextPaginated)
      ? null
      : { paginated: nextPaginated }
  }

  public state: PaginatedState<T> = { paginated: [] }

  public render(): ReactNode {
    const { data, children, pageSize }: this['props'] = this.props

    return children(
      this.state.paginated,
      Math.floor(((data.length || 1) - 1) / pageSize),
    )
  }
}

export default Paginated
