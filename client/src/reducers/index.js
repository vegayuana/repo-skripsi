import loggedReducer from './isLogged';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  login: loggedReducer
})

export default allReducers