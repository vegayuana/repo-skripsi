import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../styles/nav.css'
import $ from 'jquery'

export class Nav extends Component {
  
  componentDidMount(){
  
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
            <li className="nav-item dropdown">
              <a className="btn-nav nav-link dropdown" data-toggle="dropdown">Login</a>
              <ul className="dropdown-menu login-form">
              <form className="form-inline"> 
                <input type="text" className="form-control" placeholder="NPM" required />
                <input type="text" className="form-control" placeholder="Password" required />
                <button type="submit" className="btn">Login</button>  
              </form>
              </ul>
            </li>
            <li className="nav-item">
            <Link to='/register' className="btn-nav nav-link">Sign Up</Link>
            </li>
          </ul>          
        </div>
      </nav>
      </>
    )
  }
}

export default Nav
