import React, { Component } from 'react'
import bg3 from '../icons/bg3.png'

export class Register extends Component {
  state={
    users:[]
  }
  submit = (e) =>{
    e.preventDefault();
    
    let users = this.state.users;
    let fName = this.refs.fName.value;
    let lName = this.refs.lName.value;
    let npm = this.refs.npm.value;
    let pass = this.refs.pass.value;
    let ktm = this.refs.ktm.value;
    let time = new Date().getTime();
    let user = {
      fName, lName, npm, pass, ktm, time
    }
    
    users.push(user);

    this.setState({
      users: users,
    });

    console.log(users)
    this.refs.registerForm.reset();
  }
  render() {
    return (
    <>
      <img src={bg3} alt="Logo" className="bg3"/>
      <div className="row no-margin">
        <div className="col-xl-9 col-lg-12 register-box">
          <h3>Register</h3>
          <form ref="registerForm">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" ref="fName" id="idFName" className="form-control" placeholder="Enter First Name"/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" ref="lName" id="idLName" className="form-control" placeholder="Enter Last Name"/>
            </div>
            <div className="form-group">
              <label>NPM</label>
              <input type="text" ref="npm" id="idNPM" className="form-control" placeholder="Enter NPM"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" ref="pass" id="idPass" className="form-control" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label>Foto KTM</label>
              <input type="file" ref="ktm" className="form-control-file" id="idKTM"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)}> Submit</button>
          </form>
        </div>
        <div className="col-xl-3"></div>
      </div>
    </>
    )
  }
}
export default Register
