import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setToken } from "../reducers/authReducer"
import { connect } from 'react-redux'
import "../styles/nav.css";
import { FaUserAlt } from "react-icons/fa";
export class Nav extends Component {
  state = {
    npm: '',
    pass: '',
    token: ''
  };
  componentDidUpdate(prevProps){
    if(prevProps.token!== this.props.token){
      this.setState({
        token : this.props.token
      })
    }
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
          {/*Toggler*/}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggle" aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/*Collapse Items*/}
          <div className="collapse navbar-collapse" id="toggle">
            <ul className="navbar-nav">
              {!this.state.token ? (
                <>
                  <li className="nav-item dropdown">
                    <a className="btn-nav nav-link dropdown" data-toggle="dropdown">
                      Login
                    </a>
                    <ul className="dropdown-menu login-form">
                      <form className="form-inline">
                        <input type="text" id="npm" className="form-control" placeholder="NPM" onChange={this.handleChange} required/>
                        <input type="password" id="pass" className="form-control" placeholder="Password" onChange={this.handleChange} required
                        />
                        <button
                          type="submit"
                          className="btn"
                          onClick={e => this.submitLogin(e)}
                        >
                          Login
                        </button>
                      </form>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn-nav nav-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="btn-nav nav-link dropdown"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Log Out
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (npm, password) => dispatch(setToken(npm, password))
  };
};

const mapStateToProps = state => {
  return{
    token : state.auth.token
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
