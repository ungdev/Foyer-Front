import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import {createBrowserHistory as createHistory} from 'history'
import rootReducer from './redux'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  middleware.push(createLogger({ collapsed: true }))
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const setupStore = () => {
  const store = createStore(rootReducer, initialState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./redux', () => {
        const nextRootReducer = require('./redux')
        store.replaceReducer(nextRootReducer, store.state)
      })
    }
  }

  return store
}

export default setupStore
