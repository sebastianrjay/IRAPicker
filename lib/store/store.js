import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers/reducer'

const initialState = {}
const isProd = (process.env.NODE_ENV === 'production')
const logger = createLogger()
const middleware = () => (
  isProd ? applyMiddleware(thunk) : applyMiddleware(thunk, logger)
)

const store = createStore(reducer, initialState, middleware())

export default store
