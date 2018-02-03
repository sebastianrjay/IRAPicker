import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { loadState, saveState } from './local_storage'
import reducer from '../reducers/reducer'

const isProd = (process.env.NODE_ENV === 'production')
const logger = createLogger()
const persistedState = loadState()
const middleware = () => (
  isProd ? applyMiddleware(thunk) : applyMiddleware(thunk, logger)
)

const store = createStore(reducer, persistedState, middleware())
store.subscribe(() => saveState(store.getState()))

export default store
