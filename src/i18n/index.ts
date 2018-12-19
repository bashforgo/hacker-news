import { format as formatDate, formatDistance, Locale } from 'date-fns'
import i18next, { i18n } from 'i18next'
import { isDev } from '../util'

export function setup(initLanguage: string): Promise<i18n> {
  let currentLocale: Locale | undefined

  return new Promise(
    (resolve: (i: i18n) => void, reject: (e: Error) => void): void => {
      i18next
        .use({
          type: 'backend',
          read(
            language: string,
            namespace: string,
            callback: (err: Error | null, result?: object) => void,
          ): void {
            import(`./locales/${language}/${namespace}.json`)
              .then((result: object) => callback(null, result))
              .catch((error: Error) => {
                if (isDev()) {
                  // tslint:disable-next-line no-console
                  console.warn(
                    'translation not found',
                    language,
                    namespace,
                    error,
                  )
                }
                callback(null, {})
              })
          },
        })
        .init(
          {
            debug: false,
            lng: initLanguage,
            fallbackLng: false,
            defaultNS: 'shared',
            ns: 'shared',
            interpolation: {
              escapeValue: false,
              formatSeparator: '|',
              format(value: unknown, format?: string): string {
                switch (format) {
                  case 'distance': {
                    if (typeof value !== 'number') {
                      throw new Error('invalid distance value')
                    }
                    return formatDistance(new Date(1000 * value), new Date(), {
                      addSuffix: true,
                      locale: currentLocale,
                    })
                  }
                  case 'date': {
                    if (typeof value !== 'number') {
                      throw new Error('invalid distance value')
                    }
                    return formatDate(new Date(1000 * value), 'PP', {
                      locale: currentLocale,
                    })
                  }
                  default:
                    throw new Error('formatter not implemented')
                }
              },
            },
            react: {
              wait: true,
            },
          },
          (error: unknown) => {
            if (error) {
              reject(new Error(`${error}`))
            } else {
              resolve(i18next)
            }
          },
        )
        .on('languageChanged', (language: string) => {
          import(/* webpackInclude: /(en-GB|en-US)\/index.js$/ */ `date-fns/locale/${language}`)
            .then(
              (locale: Locale): void => {
                currentLocale = locale
              },
            )
            .catch((error: Error) => {
              if (isDev()) {
                // tslint:disable-next-line no-console
                console.warn('locale not found', language, error)
              }
            })
        })
    },
  )
}
