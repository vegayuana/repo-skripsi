import React, { Component } from 'react'
import bg3 from '../icons/bg3.png'
import axios from 'axios'
export class Register extends Component {
  state={
    users:[],
    name: '',
    npm: '', 
    pass: '', 
    ktm:'',
    passCheck: '', 
    message: '', 
    status:''
  }
  submit = (e) =>{
    console.log({e})
    let {name, npm, pass, ktm }= this.state
    const data = new FormData()
    data.append('file',ktm)
    e.preventDefault();
    console.log(this.state)
    axios({
      method: "post",
      url: "http://localhost:3000/register",
      data: {
        name: name, 
        npm: npm,
        password: pass,
        ktm_url: ktm,
      }
    }).then((res) =>{
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
    if (e.target.value !== this.state.pass){
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
  fileToBase64 = (e) =>{
    // let reader = new FileReader();
    // let file = e.target.files[0]
    // reader.readAsDataURL(file)
    // console.log(reader)
    // reader.onload = ()=>{
    //   this.setState({
    //     ktm:reader.result
    //   })
    //   console.log(this.state.ktm)
    // }
    // reader.onerror =  (error)=> {
    //   console.log('Error: ', error)
    // }

    // this.setState({
    //   ktm:e.target.name
    // })



    // let file = e.target.files[0]
    // const formData = new FormData();
    // formData.append('file', file);
    
    // let file = e.target.files[0]
    
  }
  render() {
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
              <input type="text" id="name" onChange={this.handleInput} className="form-control" placeholder="Name"/>
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
              <input type="password" id="pass" onChange={this.handleInput} className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" id="repass" onChange={this.handleRetype} className="form-control" placeholder="Password"/>
            </div>
            { passCheck === false ?
            <div className="alert alert-warning" role="alert">
              Password does not match
            </div> : <></>}
            <div className="form-group">
              <label>Foto KTM</label>
              <input type="file" id="ktm" onChange={this.fileToBase64} className="form-control-file" accept=".png, .jpg, .jpeg"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)}> Submit</button>
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
