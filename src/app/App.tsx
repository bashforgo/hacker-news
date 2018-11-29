import React, { Component } from 'react'
import Header from '../Header/Header'
import HeadlineList from '../HeadlineList/HeadlineList'
import Root from '../Root/Root'

class App extends Component {
  public render(): JSX.Element {
    return (
      <Root>
        <Header />
        <HeadlineList />
      </Root>
    )
  }
}

export default App
