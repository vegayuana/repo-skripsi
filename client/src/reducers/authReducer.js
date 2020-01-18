const initialState = {
  role:'',
  token:''
}

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
        role: action.payload.role,
        token: action.payload.token
      }
    case 'DEL_TOKEN' :
      return{
        ...state,
        role:'',
        token:action.payload
      }
      case 'DTOKEN' :
      return{
        ...state,
        role:action.payload.rl,
        token:action.payload.tkn
      }
    default: 
      return state
  }
}
export default authReducer