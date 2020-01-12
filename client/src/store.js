import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist'
import allReducers from './reducers'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth', 'Data'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk, logger)))

export default store;
