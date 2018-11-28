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
import { WithStorage, withStorage } from '../StorageProvider/StorageProvider'

interface ThemeProviderProps extends WithStorage<ThemeProviderState> {}

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

class ThemeProvider extends React.Component<
  ThemeProviderProps,
  ThemeProviderState
> {
  constructor(props: ThemeProviderProps) {
    super(props)
    this.state = {
      theme: props.storage.get('theme') || DEFAULT_THEME,
    }
  }

  public render(): ReactNode {
    return (
      <MuiThemeProvider theme={this._createMuiTheme(this.state.theme)}>
        <CssBaseline />
        <ThemeContext.Provider
          value={{
            setTheme: this._setTheme,
            selectedTheme: this.state.theme,
          }}
        >
          {this.props.children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    )
  }

  @Bind()
  private _setTheme(theme: PaletteType): void {
    if (this.state.theme !== theme) {
      this.setState({ theme })
      this.props.storage.set('theme', theme)
    }
  }

  @Memoize()
  private _createMuiTheme(type: PaletteType): Theme {
    return createMuiTheme({
      palette: { type },
      typography: {
        useNextVariants: true,
      },
    })
  }
}

export default withStorage('theme')(ThemeProvider)
