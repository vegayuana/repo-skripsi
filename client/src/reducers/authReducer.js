import moment from 'moment'
const initialState = {
  role:'',
  token:'',
  loadedAt:''
}

//Action
export const setToken = (loginInfo) => {
  return dispatch => {
    dispatch({ type: "SET_TOKEN", payload: loginInfo })
  }
} 

export const delToken = ()=>{
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
        loadedAt: moment(),
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