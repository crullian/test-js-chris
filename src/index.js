import './index.css'
import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import rootReducer from './state/reducer'

import App from './App'

// import registerServiceWorker from './registerServiceWorker'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)
const store = createStoreWithMiddleware(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
