import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  PaletteType,
  Theme,
} from '@material-ui/core'
import { BindAll, Memoize } from 'lodash-decorators'
import React, { Props, ReactNode } from 'react'
import { noop } from '../../util'

interface ThemeProviderState {
  theme: PaletteType
}

export interface ThemeContextType {
  toggleTheme(): void
}

export const ThemeContext: React.Context<
  ThemeContextType
> = React.createContext({
  toggleTheme: noop,
})

@BindAll()
class ThemeProvider extends React.Component<{}, ThemeProviderState> {
  public state: ThemeProviderState = { theme: 'dark' }

  public render(): ReactNode {
    const themeContext: ThemeContextType = { toggleTheme: this._toggleTheme }

    return (
      <MuiThemeProvider theme={this._getTheme(this.state.theme)}>
        <CssBaseline />
        <ThemeContext.Provider value={themeContext}>
          {this.props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    )
  }

  private _toggleTheme(): void {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    })
  }

  @Memoize()
  private _getTheme(type: PaletteType): Theme {
    return createMuiTheme({
      palette: { type },
      typography: {
        useNextVariants: true,
      },
    })
  }
}

export default ThemeProvider
