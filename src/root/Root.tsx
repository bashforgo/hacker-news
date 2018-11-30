import React, { Component, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import LanguageProvider from './LanguageProvider/LanguageProvider'
import StorageProvider from './StorageProvider/StorageProvider'
import ThemeProvider from './ThemeProvider/ThemeProvider'

class Root extends Component {
  public render(): ReactNode {
    return (
      <StorageProvider>
        <BrowserRouter>
          <ThemeProvider>
            <LanguageProvider>{this.props.children}</LanguageProvider>
          </ThemeProvider>
        </BrowserRouter>
      </StorageProvider>
    )
  }
}

export default Root
