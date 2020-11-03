import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import RootReducer from './reducers'

const persistConfig = {
  key: 'exp-date-root',
  storage,
  whitelist: ['courseware', 'tabs'],
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

// 启用Redux开发者工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(RootReducer))
}

console.info('Store created:', store.getState())
const persistor = persistStore(store)
// export default store
export { store, persistor }
