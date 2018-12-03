import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  PaletteType,
  withMobileDialog,
} from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import { StyleRules, WithStyles, withStyles } from '@material-ui/core/styles'
import { Settings as SettingsIcon } from 'mdi-material-ui'
import React, { Component, ComponentType, ReactElement, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import {
  LanguageContext,
  LanguageContextType,
} from '../../Root/LanguageProvider/LanguageProvider'
import {
  ThemeContext,
  ThemeContextType,
} from '../../Root/ThemeProvider/ThemeProvider'
import WithToggle from '../../WithToggle/WithToggle'
import { OptionList } from './OptionList/OptionList'

const withSettingsNamespace: ReturnType<typeof withNamespaces> = withNamespaces(
  'Settings',
)

const LanguageSettings: ComponentType = withSettingsNamespace(
  ({ t }: WithNamespaces): ReactElement<{}> => {
    const languages: { [language: string]: string } = t('languages', {
      returnObjects: true,
    })

    return (
      <LanguageContext.Consumer>
        {(context: LanguageContextType): ReactNode =>
          OptionList(
            t('language'),
            languages,
            (language: string) => (): void => context.setLanguage(language),
            (language: string) => context.selectedLanguage === language,
          )
        }
      </LanguageContext.Consumer>
    )
  },
)
const ThemeSettings: ComponentType = withSettingsNamespace(
  ({ t }: WithNamespaces): ReactElement<{}> => {
    const themes: { [language in PaletteType]: string } = t('themes', {
      returnObjects: true,
    })

    return (
      <ThemeContext.Consumer>
        {(context: ThemeContextType): ReactNode =>
          OptionList(
            t('theme'),
            themes,
            (theme: PaletteType) => (): void => context.setTheme(theme),
            (theme: PaletteType) => context.selectedTheme === theme,
          )
        }
      </ThemeContext.Consumer>
    )
  },
)

const ResponsiveDialog: ComponentType<DialogProps> = withMobileDialog<
  DialogProps
>()(Dialog)

const styles: StyleRules = {
  dialogContent: { padding: 0 },
}

class Settings extends Component<WithNamespaces & WithStyles> {
  public render(): ReactNode {
    const { t, classes }: Settings['props'] = this.props

    return (
      <WithToggle initial={false}>
        {(state: boolean, toggle: () => void): ReactNode => (
          <>
            <IconButton onClick={toggle} color="inherit">
              <SettingsIcon />
            </IconButton>
            <ResponsiveDialog open={state} onClose={toggle}>
              <DialogTitle>{t('settings')}</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <LanguageSettings />
                <ThemeSettings />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggle}>{t('shared:close')}</Button>
              </DialogActions>
            </ResponsiveDialog>
          </>
        )}
      </WithToggle>
    )
  }
}

export default withSettingsNamespace(withStyles(styles)(Settings))
