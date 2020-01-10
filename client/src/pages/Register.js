import React, { Component } from 'react'
import bg3 from '../icons/bg3.png'

export class Register extends Component {
  state={
    users:[]
  }
  componentDidMount(){

  }
  submit = (e) =>{
    e.preventDefault();
    var form = this.refs
    fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name.value,
        npm: form.npm.value,
        password: form.pass.value,
        ktm_url: form.ktm.value,
      })
    })

    // console.log(typeof(form.ktm.value))
 
    // let users = this.state.users;
    // let name = this.refs.name.value;
    // let npm = this.refs.npm.value;
    // let pass = this.refs.pass.value;
    // let ktm = this.refs.ktm.value;
    // let user = {
    //   name, npm, pass, ktm
    // }
    // users.push(user);
    // this.setState({
    //   users: users,
    // });
   
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
              <label> Name</label>
              <input type="text" ref="name" id="idFName" className="form-control" placeholder="Name"/>
            </div>
            <div className="form-group">
              <label>NPM</label>
              <input type="text" ref="npm" id="idNPM" className="form-control" placeholder="NPM"/>
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
