import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import Header from '../Header/Header'
import Root from '../Root/Root'
import FeedRoute from '../routes/FeedRoute/FeedRoute'
import ItemRoute from '../routes/ItemRoute/ItemRoute'
import NotFoundRoute from '../routes/NotFoundRoute/NotFoundRoute'
import RootRoute from '../routes/RootRoute/RootRoute'
import UserRoute from '../routes/UserRoute/UserRoute'

import '../Headline/Headline'

class App extends Component {
  public render(): JSX.Element {
    return (
      <Root>
        <Header />
        <main>
          <Switch>
            {RootRoute.use()}
            {FeedRoute.use()}
            {ItemRoute.use()}
            {UserRoute.use()}
            {NotFoundRoute.use()}
          </Switch>
        </main>
      </Root>
    )
  }
}

export default App
