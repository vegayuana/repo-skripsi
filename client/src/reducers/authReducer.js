import {Cookies} from 'react-cookie'
const cookie = new Cookies()

const initialState = {
  role:'',
  token:''
}

//Action
export const setToken = (loginInfo) => {
  cookie.set('token', loginInfo.token, {path:'/', maxAge:86400})
  cookie.set('role', loginInfo.role, {path:'/', maxAge:86400})
  return dispatch => {
    dispatch({ type: "SET_TOKEN", payload: loginInfo })
  }
} 

export const delToken = ()=>{
  cookie.remove('token')
  cookie.remove('role')
  return dispatch => {
    dispatch({ type: "DEL_TOKEN", payload: "" })
  }
}

//reducer
const authReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'SET_TOKEN':
      return {
        ...state,
        role: action.payload.role,
        token: action.payload.token
      }
    case 'DEL_TOKEN' :
      return{
        ...state,
        role:'',
        token:action.payload
      }
    default: 
      return state
  }
}
export default authReducer