import { Typography } from '@material-ui/core'
import React, { Component, ReactNode } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import FullPage from '../FullPage/FullPage'
import Header from '../Header/Header'
import HeadlineList, { Feed } from '../HeadlineList/HeadlineList'
import Root from '../Root/Root'

class App extends Component {
  public render(): JSX.Element {
    return (
      <Root>
        <Header />
        <Switch>
          <Redirect from="/" to="/top" exact />
          <Route path="/:feed(top|new|best|ask|show|job)/:page(\d+)?">
            {({
              match,
            }: RouteComponentProps<{
              feed: Feed
              page: string
            }>): ReactNode => (
              <HeadlineList
                feed={match.params.feed}
                page={Number(match.params.page || 0)}
              />
            )}
          </Route>
          <Route>
            <FullPage>
              <Typography variant="h2">404</Typography>
            </FullPage>
          </Route>
        </Switch>
      </Root>
    )
  }
}

export default App
