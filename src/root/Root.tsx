import { PaletteType } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { BindAll, Memoize } from 'lodash-decorators'
import React, { Props, ReactNode } from 'react'
import { noop } from '../util'

interface RootState {
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
class Root extends React.Component<{}, RootState> {
  constructor(props: Props<{}>) {
    super(props)
    this.state = { theme: 'dark' }
  }

  public render(): ReactNode {
    const { children }: Root['props'] = this.props
    const { theme }: Root['state'] = this.state
    const themeContext: ThemeContextType = { toggleTheme: this._toggleTheme }

    return (
      <MuiThemeProvider theme={this._getTheme(theme)}>
        <CssBaseline />
        <ThemeContext.Provider value={themeContext}>
          {children}
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

export default Root
