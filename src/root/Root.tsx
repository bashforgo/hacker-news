import React, { Component, ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'
import LanguageProvider from './LanguageProvider/LanguageProvider'
import StorageProvider from './StorageProvider/StorageProvider'
import ThemeProvider from './ThemeProvider/ThemeProvider'

class Root extends Component {
  public render(): ReactNode {
    return (
      <StorageProvider>
        <HashRouter>
          <ThemeProvider>
            <LanguageProvider>{this.props.children}</LanguageProvider>
          </ThemeProvider>
        </HashRouter>
      </StorageProvider>
    )
  }
}

export default Root
