import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root.reducer'
import rootSagas from './root.saga'

const sagaMiddleWare = createSagaMiddleware()
const middlewares = [sagaMiddleWare]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleWare.run(rootSagas)

export default store
