import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  PaletteType,
  withMobileDialog,
} from '@material-ui/core'
import { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog'
import { StyleRules, WithStyles, withStyles } from '@material-ui/core/styles'
import React, { Component, ComponentType, ReactElement, ReactNode } from 'react'
import { withNamespaces, WithNamespaces } from 'react-i18next'
import {
  LanguageContext,
  LanguageContextType,
} from '../../../Root/LanguageProvider/LanguageProvider'
import {
  ThemeContext,
  ThemeContextType,
} from '../../../Root/ThemeProvider/ThemeProvider'
import { OptionList } from '../OptionList/OptionList'

const ResponsiveDialog: ComponentType<MuiDialogProps> = withMobileDialog<
  MuiDialogProps
>()(MuiDialog)

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

interface DialogProps {
  open: boolean
  toggle(): void
}

const styles: StyleRules = {
  dialogContent: { padding: 0 },
}

class Dialog extends Component<DialogProps & WithStyles & WithNamespaces> {
  public render(): ReactNode {
    const { open, toggle, classes, t }: this['props'] = this.props

    return (
      <ResponsiveDialog open={open} onClose={toggle}>
        <DialogTitle>{t('settings')}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <LanguageSettings />
          <ThemeSettings />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>{t('shared:close')}</Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }
}

export default withSettingsNamespace(withStyles(styles)(Dialog))
