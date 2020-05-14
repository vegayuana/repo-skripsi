const initialState = {
  skripsi:'',
}

//Action
export const setList = (data) => {
  return dispatch => {
    dispatch({ type: "SET_LIST", payload: data })
  }
} 

export const delList = ()=>{
  return dispatch => {
    dispatch({ type: "DEL_LIST", payload: "" })
  }
}

//reducer
const listReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'SET_LIST':
      return {
        ...state,
        skripsi:action.payload
      }
    case 'DEL_LIST' :
      return{
        ...state,
        skripsi:''
      }
    default: 
      return state
  }
}
export default listReducer