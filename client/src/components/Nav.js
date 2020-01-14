import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { setToken, delToken } from '../reducers/authReducer'
import { connect } from 'react-redux'
import '../styles/nav.css'
import { FaUserAlt } from 'react-icons/fa'
import $ from 'jquery'
export class Nav extends Component {
  state = {
    npm: '',
    pass: '',
    token: ''
  }
  componentDidMount(){
    
  }
  componentDidUpdate(prevProps){
    if(prevProps.token!== this.props.token){
      this.setState({
        token : this.props.token
      })
    }
    $('.collapse a').click(function(event){
      $('.collapse').removeClass( "show" )
    })
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  submitLogin = e => {
    e.preventDefault();
    this.props.login(this.state.npm, this.state.pass);
  };
  logout = e =>{
    this.props.logout();
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md sticky-top navbar-dark">
          {/*Brand Name*/}
          <Link to="/" className="navbar-brand">
            <p>
              REPO<span>SKRIPSI</span>
            </p>
          </Link>
          
          {!this.state.token ? 
          <>
          {/*Toggler*/}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggle1" aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/*Collapse Items*/}
          <div className="collapse navbar-collapse" id="toggle1">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button className="btn btn-nav btnNav dropdown" data-toggle="dropdown">Login</button>
                <ul className="dropdown-menu login-form">
                  <form className="form-inline">
                    <input type="text" id="npm" className="form-control" placeholder="NPM" onChange={this.handleChange} required/>
                    <input type="password" id="pass" className="form-control" placeholder="Password" onChange={this.handleChange} required/>
                    <button type="submit" className="btn" onClick={e => this.submitLogin(e)}>
                      Login
                    </button>
                  </form>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/register" className="btn btn-nav btnNav ">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          </>
          : 
          <div className="right">
          <button className="btn btn-nav" id="tes" data-toggle="collapse" data-target="#userMenu" aria-expanded="false" aria-controls="userMenu">
            <FaUserAlt />
          </button>
          <li className="nav-item navbar-nav">
            <div className="collapse user-menu" id="userMenu">
              <div className="right">
              <button className="btn btn-nav" id="tes" data-toggle="collapse" data-target="#userMenu" aria-expanded="false" aria-controls="userMenu">
              x
              </button>
              </div>
              <Link to="/profile" className="dropdown-item">
                Profil
              </Link>
              <Link to="/upload" className="dropdown-item">
                Unggah Skripsi
              </Link>
              <Link to="/" className="dropdown-item" onClick={()=>this.logout()}>
                Log Out
              </Link>
            </div>
          </li>
          </div>
          }
        </nav>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (npm, password) => dispatch(setToken(npm, password)),
    logout: () => dispatch(delToken())
  };
};

const mapStateToProps = state => {
  return{
    token : state.auth.token
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
