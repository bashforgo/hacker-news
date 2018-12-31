import { Button, Grid, LinearProgress, Typography } from '@material-ui/core'
import { Bind } from 'lodash-decorators'
import React, { Component, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Subscription } from 'rxjs'
import { filterFeed$, getUserSubmissions$ } from '../../api/rx'
import { Item, UserId } from '../../api/types'
import EmptyPlaceHolder from '../../EmptyPlaceholder/EmptyPlaceHolder'
import Headline from '../../Headline/Headline'
import SubmissionsRoute, {
  Filter,
} from '../../routes/UserRoute/SubmissionsRoute/SubmissionsRoute'

interface SubmissionsProps {
  id: UserId
  filter: Filter
  amount?: number
}

interface SubmissionsState {
  items: Item[]
  left: number
  loading: boolean
}

const PAGE_SIZE: number = 30

class Submissions extends Component<
  SubmissionsProps & RouteComponentProps & WithNamespaces,
  SubmissionsState
> {
  public state: SubmissionsState = { items: [], left: 0, loading: true }
  private _subscription?: Subscription

  public componentDidMount(): void {
    this._subscribe()
  }

  public componentDidUpdate(prevProps: SubmissionsProps): void {
    const reload: boolean =
      this.props.id !== prevProps.id || this.props.filter !== prevProps.filter
    if (reload || this.props.amount !== prevProps.amount) {
      this._unsubscribe()
      this._subscribe()
      this.setState({ loading: true })
    }

    if (reload) {
      this.setState({ items: [], left: 0 })
    }
  }

  public componentWillUnmount(): void {
    this._unsubscribe()
  }

  public render(): ReactNode {
    return (
      <>
        {this._renderEmptyPlaceholder()}
        {this.props.filter === 'comments'
          ? this._renderComments()
          : this._renderSubmissions()}
        {this.state.loading ? <LinearProgress /> : null}
        {this._renderPager()}
      </>
    )
  }

  private _renderEmptyPlaceholder(): ReactNode {
    const { loading, items }: this['state'] = this.state
    const { t, filter }: this['props'] = this.props

    return loading || items.length ? null : (
      <EmptyPlaceHolder message={t('empty', { context: filter })} />
    )
  }

  private _renderComments(): ReactNode {
    return this.state.items.map((item: Item) => (
      <Headline item={item} expanded key={item.id} />
    ))
  }

  private _renderSubmissions(): ReactNode {
    return this.state.items.map((item: Item) => (
      <Headline item={item} key={item.id} />
    ))
  }

  private _renderPager(): ReactNode {
    return this.state.left ? (
      <Grid container spacing={8} justify="center">
        <Grid item>
          <Button onClick={this._more}>{this.props.t('more')}</Button>
        </Grid>
      </Grid>
    ) : null
  }

  @Bind()
  private _more(): void {
    const { id, filter }: this['props'] = this.props

    this.props.history.push(
      SubmissionsRoute.makeURL({
        filter,
        id,
        amount: this._getAmount() + PAGE_SIZE,
      }),
    )
  }

  private _getAmount(): number {
    return this.props.amount || PAGE_SIZE
  }

  @Bind()
  private _predicate({ dead, deleted, type, by }: Item): boolean {
    if (dead || deleted || !by) return false

    switch (this.props.filter) {
      case 'comments':
        return type === 'comment'
      case 'submissions':
        return type !== 'comment' && type !== 'pollopt'
    }
  }

  private _subscribe(): void {
    this._subscription = filterFeed$(
      getUserSubmissions$(this.props.id),
      this._predicate,
      this._getAmount(),
    ).subscribe(({ items, left }: { items: Item[]; left: number }) => {
      this.setState({ items, left, loading: false })
    })
  }

  private _unsubscribe(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }
}

export default withNamespaces('Submissions')(withRouter(Submissions))
