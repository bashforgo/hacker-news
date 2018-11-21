import React, { Component, ReactNode } from 'react'
import LanguageProvider from './LanguageProvider/LanguageProvider'
import ThemeProvider from './ThemeProvider/ThemeProvider'

class Root extends Component {
  public render(): ReactNode {
    return (
      <ThemeProvider>
        <LanguageProvider>{this.props.children}</LanguageProvider>
      </ThemeProvider>
    )
  }
}

export default Root
