import { createStore, applyMiddleware, compose } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import createEncryptor from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import allReducers from './reducers'
import authReducer from './reducers/authReducer'
import expireReducer from 'redux-persist-expire'

import thunk from 'redux-thunk'

const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key-repository-webapp',
  function(error) {
    // Handle the error.
  },
})

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor, 
    expireReducer(authReducer, {
      persistedAtKey: 'loadedAt',
      expireSeconds: 86400,
      expiredState: []        
  })],
}

let persistedReducer = persistCombineReducers(persistConfig, allReducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))

let persistor = persistStore(store)

export { store, persistor }
