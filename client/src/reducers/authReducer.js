import axios from "axios";

const initialState = {
  role:'',
  token:''
}

export const setToken = (npm, password) => {
  return dispatch => {
    axios({
      method: "post",
      url: "http://localhost:3000/user/login",
      data: {
        npm: npm,
        password: password
      }
    }).then(res => {
      let user = res.data.data
      console.log (user)
      if (user.isLogged) {
        dispatch({ type: "SET_TOKEN", payload: user })
      } else {
        console.log("Login Failed")
      }
    })
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
        token: 'Bearer ' + action.payload.token
      }
    case 'DEL_TOKEN' :
      return{
        ...state,
        token:action.payload
      }
    default: 
      return state
  }
}
export default authReducer