import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  PaletteType,
  Theme,
} from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { Bind, Memoize } from 'lodash-decorators'
import React, { ReactNode } from 'react'
import { noop } from '../../util'
import { WithStorage, withStorage } from '../StorageProvider/StorageProvider'

declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    appMaxWidth: number
    toolbarMaxWidth: number
    feedLink: CSSProperties
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    link: {
      default: string
      active: string
    }
  }

  interface Palette {
    link: {
      default: string
      active: string
    }
  }
}

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
      theme: props.storage.get('theme', DEFAULT_THEME),
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
      mixins: {
        appMaxWidth: 8 * 120,
        toolbarMaxWidth: 8 * 150,
        feedLink: {
          fontWeight: 300,
          '&.isActive::before': {
            content: '"> "',
          },
        },
      },
      palette: {
        type,
        link:
          type === 'light'
            ? {
                default: indigo.A700,
                active: indigo[700],
              }
            : {
                default: indigo.A100,
                active: indigo[100],
              },
      },
      typography: {
        useNextVariants: true,
      },
    })
  }
}

export default withStorage('theme')(ThemeProvider)
