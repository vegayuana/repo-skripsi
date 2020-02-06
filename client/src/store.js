import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
// import { persistReducer, persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import allReducers from './reducers'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export default () =>{
//   let store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk, logger)))
//   let persistor = persistStore(store)
//   return{
//     store,
//     persistor
//   }
// }
const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk, logger)))

export default store;
