const initialState = {
  user: '',
  role:'',
  token:'',
  isLogged: false
}
const loggedReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'LOGIN': 
      return {
        ...state,
        islogin: true 
      }
    default: 
      return state
  }
}
export default loggedReducer