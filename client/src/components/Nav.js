import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import { connect, useSelector, useDispatch } from 'react-redux'
// import { Login } from '../action'
import '../styles/nav.css'
import { FaUserAlt } from 'react-icons/fa';
const axios = require('axios');

export class Nav extends Component {
  state={
    auth: false,
    token: ''
  }
  componentDidMount(){
  }
  mapStateToProps = state => {
    return {
       names: state.names 
    }
 }
  submitLogin = (e) =>{
    e.preventDefault();
    let token = ''
    let form = this.refs
    axios({
      method: 'post',
      url: 'http://localhost:3000/user/login',
      data: {
        npm: form.npm.value,
        password: form.pass.value
      }
    })
    .then( res =>{
      let datas = res.data.data
      console.log(res)
      if(datas.login) {
        console.log('Login Success')
        this.setState({
          auth:true,
          token: datas.token
        })
        token = 'Bearer ' + this.state.token
        console.log(token)
      } else {
        console.log('Login Failed')
      }
    })
  }
  render() {
    return (
      <>
      <nav className="navbar navbar-expand-md sticky-top navbar-dark">
        {/*Brand Name*/}
        <Link to='/' className="navbar-brand">
          <p>REPO<span>SKRIPSI</span></p>
        </Link>
        {/*Toggler*/}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggle" aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/*Collapse Items*/}
        <div className="collapse navbar-collapse" id="toggle">
          <ul className="navbar-nav"> 
          { !this.state.auth ?
            <>
            <li className="nav-item dropdown">
              <a className="btn-nav nav-link dropdown" data-toggle="dropdown">Login</a>
              <ul className="dropdown-menu login-form">
                <form className="form-inline"> 
                  <input type="text" ref="npm" className="form-control" placeholder="NPM" required />
                  <input type="password" ref="pass" className="form-control" placeholder="Password" required />
                  <button type="submit" className="btn" onClick={(e)=>this.submitLogin(e)}>Login</button>  
                </form>
              </ul>
            </li>
            <li className="nav-item">
              <Link to='/register' className="btn-nav nav-link">Sign Up</Link>
            </li>
            </>
            : 
            <li className="nav-item dropdown">
              <a className="btn-nav nav-link dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                <FaUserAlt/>
              </a>
              <div className="dropdown-menu"  aria-labelledby="dropdownMenuLink">
                <Link to='/profile' className="dropdown-item">Profile</Link>
                <Link to='/' className="dropdown-item">Log Out</Link>
              </div>
            </li>
          }
          </ul>          
        </div>
      </nav>
      </>
    )
  }
}
export default Nav
