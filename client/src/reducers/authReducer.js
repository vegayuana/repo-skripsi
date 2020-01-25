const initialState = {
  role:'',
  token:''
}

export const setToken = (loginInfo) => {
  localStorage.setItem('token', loginInfo.token)
  localStorage.setItem('role', loginInfo.role)
  return dispatch => {
    dispatch({ type: "SET_TOKEN", payload: loginInfo })
  }
} 

export const delToken = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('role')
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