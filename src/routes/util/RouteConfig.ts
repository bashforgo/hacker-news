import { ReactNode } from 'react'

export interface RouteConfig<Params extends Record<string, unknown> = {}> {
  use(): ReactNode
  makeURL(params: Params): string
}
