import { Bind } from 'lodash-decorators'
import React, { ReactNode } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { AnyRecord } from '../../types'
import AbstractRouteConfig from './AbstractRouteConfig'

export type AsString<T extends AnyRecord> = {
  [k in keyof T]: T[k] extends string ? T[k] : string
}

abstract class SimpleRouteConfig<
  Params extends AnyRecord = {}
> extends AbstractRouteConfig<Params> {
  public use(): ReactNode {
    return <Route path={this.URL}>{this._translateParams}</Route>
  }

  protected abstract translateParams(params: AsString<Params>): ReactNode

  @Bind()
  private _translateParams({
    match,
  }: RouteComponentProps<AsString<Params>>): ReactNode {
    return match ? this.translateParams(match.params) : null
  }
}

export default SimpleRouteConfig
