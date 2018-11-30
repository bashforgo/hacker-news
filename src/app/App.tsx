import { Typography } from '@material-ui/core'
import React, { Component, ReactNode } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
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
          <Route path="/:feed(top|new|best|ask|show|job)?" exact>
            {({ match }: RouteComponentProps<{ feed: Feed }>): ReactNode => (
              <HeadlineList feed={match.params.feed} />
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
