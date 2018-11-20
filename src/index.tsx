import React from 'react'
import reactDom from 'react-dom'
import App from './app/App'
import * as serviceWorker from './service-worker'

import 'typeface-roboto'

reactDom.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
