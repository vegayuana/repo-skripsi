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
    status:'',
    file:null,
    fileName:''
  }
  submit = (e) =>{
    e.preventDefault();
    let {name, npm, pass, fileName, file}= this.state

      axios({
        mode: 'no-cors',
        method: "POST",
        url: "http://localhost:3000/image",
        data: file,
        headers:{
          'Content-Type':'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT, GET, POST'
        }
      })
      .then(function (res) {
        console.log(res.data)
        if (res.ok) {
          alert("Perfect!")
          const formData = new FormData()
          formData.append('ktm', file)
        } else if (res.status == 401) {
          alert("Oops!")
        }
      }, function (e) {
        alert("Error submitting form!");
      });
    // catch(err){
    //   console.log(err.response)
    // }
    // const regis = {
    //   'name': name, 
    //   'npm': npm,
    //   'password': pass,
    //   'ktm_url': fileName,
    // }
    // data.append('file',)
    // e.preventDefault();
    // console.log(this.state)
    // axios({
    //   method: "post",
    //   url: "http://localhost:3000/register",
    //   data: {
       
    //   }
    // }).then((res) =>{
    //   this.setState({
    //     message:res.data.message,
    //     status:res.data.status,
    //   })
    //   this.refs.registerForm.reset();
    // })
    // .catch((err) => { 
    //   this.setState({
    //     message:err.response.data.message,
    //     status:err.response.data.status,
    //   })
    // })
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
  handleFile=(e)=>{
    this.setState({
      file:e.target.files[0],
      fileName: e.target.files[0].name
    })
  }
  render() {
    let {npm, passCheck, message, status} =this.state
    
    console.log('ini file', this.state.file)
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
              <input type="file" id="ktm" onChange={this.handleFile} className="form-control-file" accept=".png, .jpg, .jpeg"/>
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
