import i18next, { i18n } from 'i18next'
import { isDev } from '../util'

export function setup(initLanguage: string): Promise<i18n> {
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
            lng: initLanguage,
            fallbackLng: false,
            debug: isDev(),
            defaultNS: 'shared',
            ns: 'shared',
            interpolation: {
              escapeValue: false,
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
    },
  )
}
