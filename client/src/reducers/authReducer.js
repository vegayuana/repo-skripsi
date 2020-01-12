import axios from "axios";

const initialState = {
  user: '',
  role:'',
  token:'',
  isLogged: false
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
      let datas = res.data.data
      console.log (datas)
      if (datas.login) {
        dispatch({ type: "SET_TOKEN", payload: "Bearer " + datas.token })
      } else {
        console.log("Login Failed")
      }
    })
  }
} 

//reducer
const loggedReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'SET_LOGIN': 
      return {
        ...state,
        isLogged: true 
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
        isLogged:true
      }
    default: 
      return state
  }
}
export default loggedReducer