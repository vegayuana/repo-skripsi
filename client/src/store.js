import { createStore, applyMiddleware, compose } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import allReducers from './reducers'

import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}

let persistedReducer = persistCombineReducers(persistConfig, allReducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))

let persistor = persistStore(store)

export { store, persistor }
