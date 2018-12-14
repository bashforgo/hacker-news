import { i18n } from 'i18next'
import { Bind, Once } from 'lodash-decorators'
import React, { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import Async from '../../Async/Async'
import ErrorPage from '../../ErrorPage/ErrorPage'
import { setup } from '../../i18n'
import LoadingPage from '../../LoadingPage/LoadingPage'
import { noop } from '../../util'
import { withStorage, WithStorage } from '../StorageProvider/StorageProvider'

interface LanguageProviderProps extends WithStorage<LanguageProviderState> {}
interface LanguageProviderState {
  language: string
}

export interface LanguageContextType {
  selectedLanguage: string
  setLanguage(language: string): void
}

const DEFAULT_LANGUAGE: string = 'en-GB'
export const LanguageContext: React.Context<
  LanguageContextType
> = React.createContext({
  selectedLanguage: DEFAULT_LANGUAGE,
  setLanguage: noop,
})

class LanguageProvider extends React.Component<
  LanguageProviderProps,
  LanguageProviderState
> {
  public state: LanguageProviderState = { language: DEFAULT_LANGUAGE }
  constructor(props: LanguageProviderProps) {
    super(props)
    this.state = {
      language: props.storage.get('language', DEFAULT_LANGUAGE),
    }
  }

  public render(): ReactNode {
    return (
      <Async promise={this._i18n}>
        <Async.Pending>
          <LoadingPage />
        </Async.Pending>
        <Async.Resolved>
          {(i18next: i18n): ReactNode => {
            return (
              <I18nextProvider i18n={i18next}>
                <LanguageContext.Provider
                  value={this._getLanguageContext(i18next)}
                >
                  {this.props.children}
                </LanguageContext.Provider>
              </I18nextProvider>
            )
          }}
        </Async.Resolved>
        <Async.Rejected>{(): ReactNode => <ErrorPage />}</Async.Rejected>
      </Async>
    )
  }

  private _getLanguageContext(i18next: i18n): LanguageContextType {
    return {
      selectedLanguage: this.state.language,
      setLanguage: (language: string): void => {
        if (this.state.language !== language) {
          i18next.changeLanguage(language)
          this.props.storage.set('language', language)
          this.setState({ language })
        }
      },
    }
  }

  @Bind()
  @Once()
  private _i18n(): Promise<i18n> {
    return setup(this.state.language)
  }
}

export default withStorage('language')(LanguageProvider)
