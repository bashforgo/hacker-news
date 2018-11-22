import { i18n } from 'i18next'
import { BindAll, Once } from 'lodash-decorators'
import React, { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import Async from '../../Async/Async'
import ErrorPage from '../../ErrorPage/ErrorPage'
import { setup } from '../../i18n'
import LoadingPage from '../../LoadingPage/LoadingPage'
import { noop } from '../../util'

interface LanguageProviderState {
  language: string
}

export interface LanguageContextType {
  setLanguage(language: string): void
}

export const LanguageContext: React.Context<
  LanguageContextType
> = React.createContext({
  setLanguage: noop,
})
const DEFAULT_LANGUAGE: string = 'en-GB'

@BindAll()
class LanguageProvider extends React.Component<{}, LanguageProviderState> {
  public state: LanguageProviderState = { language: DEFAULT_LANGUAGE }

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
      setLanguage: (language: string): void => {
        if (this.state.language !== language) {
          i18next.changeLanguage(language)
          this.setState({ language })
        }
      },
    }
  }

  @Once()
  private _i18n(): Promise<i18n> {
    return setup(this.state.language)
  }
}

export default LanguageProvider
