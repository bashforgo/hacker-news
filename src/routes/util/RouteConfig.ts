import { ReactNode } from 'react'

interface RouteConfig<Params extends Record<string, unknown> = {}> {
  use(): ReactNode
  makeURL(params: Params): string
}

export default RouteConfig
