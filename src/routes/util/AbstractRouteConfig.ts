import { Memoize } from 'lodash-decorators'
import { compile } from 'path-to-regexp'
import { ReactNode } from 'react'
import RouteConfig from './RouteConfig'

abstract class AbstractRouteConfig<
  Params extends Record<string | number, unknown> = {}
> implements RouteConfig<Params> {
  protected abstract URL: string

  public abstract use(): ReactNode

  public makeURL(params: Params): string {
    const fn: this['makeURL'] = this._compileURL(this.URL)
    return fn(params)
  }

  @Memoize()
  private _compileURL(URL: string): this['makeURL'] {
    return compile(URL)
  }
}

export default AbstractRouteConfig
