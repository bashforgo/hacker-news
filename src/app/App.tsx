import Button from '@material-ui/core/Button'
import React, { Component, ReactNode } from 'react'
import Root, { ThemeContext, ThemeContextType } from '../root/Root'

class App extends Component {
  public render(): JSX.Element {
    return (
      <Root>
        <ThemeContext.Consumer>
          {({ toggleTheme }: ThemeContextType): ReactNode => (
            <Button onClick={toggleTheme}>wow such react</Button>
          )}
        </ThemeContext.Consumer>
      </Root>
    )
  }
}

export default App
