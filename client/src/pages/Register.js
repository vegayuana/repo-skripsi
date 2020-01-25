import React, { Component } from 'react'
import bg3 from '../icons/bg3.png'
import axios from 'axios'
export class Register extends Component {
  initialState = {
    npm: '', 
    passCheck: '', 
    message: '', 
    status:'',
    file:null
  }
  state=this.initialState
  submit = (e) =>{
    e.preventDefault()
    let {npm, file}= this.state
    let name = this.refs.name.value
    let pass = this.refs.pass.value
    console.log(typeof(npm))
    console.log(this.state)
    const formData = new FormData()
    formData.append('ktm', file)
    formData.append('name', name)
    formData.append('npm', npm)
    formData.append('password', pass)
    axios({
      method: "POST",
      url: "/register",
      data: formData,
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then((res) =>{
      this.setState(this.initialState)
      this.setState({
        message:res.data.message,
        status:res.data.status,
      })
      this.refs.registerForm.reset();
    })
    .catch((err) => { 
      this.setState({
        message:err.response.data.message,
        status:err.response.data.status,
      })
    })
  }
  handleInput = (e) =>{
    this.setState({
      [e.target.id] : e.target.value,
    })
  }
  handleRetype = (e) =>{
    console.log(this.state.passCheck)
    if (e.target.value !== this.refs.pass.value){
      this.setState({
        passCheck: false
      })
    }
    else{
      this.setState({
        passCheck: true
      })
    }
  }
  handleFile=(e)=>{
    if (e.target.files[0]){
      this.setState({
        file:e.target.files[0]
      })
    }
    else{
      this.setState({
        file:''
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if((nextState.message!==this.state.message) || (nextState.status!==this.state.status)){
      return true
    }
    
    if(nextState.passCheck === this.state.passCheck){
      return false
    }
    return true
  }
  render() {
    console.log('render')
    let {npm, passCheck, message, status} =this.state
    return (
    <>
      <img src={bg3} alt="Logo" className="bg3"/>
      <div className="row no-margin">
        <div className="col-xl-9 col-lg-12 register-box">
          <h3>Register</h3>
          <form ref="registerForm">
            <div className="form-group">
              <label> Name</label>
              <input type="text" ref='name' className="form-control" placeholder="Name"/>
            </div>
            <div className="form-group">
              <label>NPM</label>
              <input type="text" id="npm" onChange={this.handleInput} className="form-control" placeholder="NPM"/>
            </div>
            { npm.length < 12 && npm.length >0 ?
            <div className="alert alert-warning" role="alert">
              <strong>NPM is incorrect! </strong>require min 12 digits
            </div> : <></>}
            <div className="form-group">
              <label>Password</label>
              <input type="password" ref='pass' id="pass" className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" onChange={this.handleRetype} className="form-control" placeholder="Password"/>
            </div>
            { passCheck === false ?
            <div className="alert alert-warning" role="alert">
              Password does not match
            </div> : <></>}
            <div className="form-group">
              <label>Foto KTM</label>
              <input type="file" id="ktm" onChange={this.handleFile} className="form-control-file" accept=".png, .jpg, .jpeg"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)} disabled={!passCheck}> Submit</button>
            { message ==='' ? <></> :
                status===200 ?
                  <div className="alert alert-success" role="alert">
                    <strong>{this.state.message}</strong> Please Log In
                  </div>
                  :
                <div className="alert alert-danger" role="alert">
                  <strong>{this.state.message}</strong>
                </div>
             }
          </form>
        </div>
        <div className="col-xl-3"></div>
      </div>
    </>
    )
  }
}
export default Register