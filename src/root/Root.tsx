import React, { Component, ReactNode } from 'react'
import LanguageProvider from './LanguageProvider/LanguageProvider'
import StorageProvider from './StorageProvider/StorageProvider'
import ThemeProvider from './ThemeProvider/ThemeProvider'

class Root extends Component {
  public render(): ReactNode {
    return (
      <StorageProvider>
        <ThemeProvider>
          <LanguageProvider>{this.props.children}</LanguageProvider>
        </ThemeProvider>
      </StorageProvider>
    )
  }
}

export default Root
