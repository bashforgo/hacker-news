import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  PaletteType,
  Theme,
} from '@material-ui/core'
import { Bind, Memoize } from 'lodash-decorators'
import React, { ReactNode } from 'react'
import { noop } from '../../util'

interface ThemeProviderState {
  theme: PaletteType
}

export interface ThemeContextType {
  selectedTheme: PaletteType
  setTheme(theme: PaletteType): void
}

const DEFAULT_THEME: PaletteType = 'dark'
export const ThemeContext: React.Context<
  ThemeContextType
> = React.createContext({
  selectedTheme: DEFAULT_THEME,
  setTheme: noop,
} as ThemeContextType)

class ThemeProvider extends React.Component<{}, ThemeProviderState> {
  public state: ThemeProviderState = { theme: DEFAULT_THEME }

  public render(): ReactNode {
    const themeContext: ThemeContextType = {
      selectedTheme: this.state.theme,
      setTheme: this._setTheme,
    }

    return (
      <MuiThemeProvider theme={this._getTheme(this.state.theme)}>
        <CssBaseline />
        <ThemeContext.Provider value={themeContext}>
          {this.props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    )
  }

  @Bind()
  private _setTheme(theme: PaletteType): void {
    this.setState({ theme })
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
