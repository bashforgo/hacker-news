import React, { Component } from 'react'
import Header from '../Header/Header'
import Root from '../Root/Root'

class App extends Component {
  public render(): JSX.Element {
    return (
      <Root>
        <Header />
      </Root>
    )
  }
}

export default App
