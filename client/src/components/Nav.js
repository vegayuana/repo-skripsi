import React, { Component } from 'react'
import UserMenu from '../components/UserMenu'
import AdminMenu from '../components/AdminMenu'
import { Link, Redirect } from 'react-router-dom'
import { setToken, delToken} from '../reducers/authReducer'
import { Cookies } from 'react-cookie'
import { connect } from 'react-redux'
import '../styles/nav.css'
import axios from 'axios'
import $ from 'jquery'

const cookies = new Cookies();
export class Nav extends Component {
  
  state = {
    npm: '',
    pass: '',
    token: '',
    role: '',
    message: '',
    status: null
  }
  componentDidMount(){
    // if(cookies.get('token')){
    //   this.setState({
    //     token: cookies.get('token'),
    //     role: cookies.get('role')
    //   })
    // }
    $('a').click(()=>{
      $('.collapse').removeClass( "show" )
    })
  }
  componentDidUpdate(prevProps){
    if(prevProps.token!== this.props.token){
      this.setState({
        token : this.props.token,
        role : this.props.role
      })
      cookies.set('token', this.props.token, {path: '/'})
      cookies.set('role', this.props.role, {path: '/'})
      console.log('cookies :'+cookies.get('token'))
      if (this.props.token===''){
        cookies.remove('token')
      }
    }
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  submitLogin = e => {
    e.preventDefault()
    console.log(this.state.npm)
    axios({
      method: "post",
      url: "/login",
      data: {
        npm: this.state.npm,
        password: this.state.pass
      }
    }).then(res => {
      let loginInfo = res.data.data
      console.log (loginInfo)
      this.setState({
        status:''
      })
      if (loginInfo.isLogged) {
        this.props.login(loginInfo)
      }
    }).catch((err) => { 
      this.setState({
        message:err.response.data.message,
        status:err.response.data.status,
      })
    }) 
  }
  logout = () =>{
    this.props.logout()
  }

  render() {
    let { token, role, message, status} = this.state
    return (
      <>
      <nav className="navbar navbar-expand-md sticky-top navbar-dark">
        {/*Brand Name*/}
        <Link to="/" className="navbar-brand">
          <p>
            REPO<span>SKRIPSI</span>
          </p>
        </Link>
      
        {!token ? 
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
                    {status===400? 
                    <div className="alert alert-danger login-alert" role="alert">
                      <strong>{message}</strong>
                    </div>
                    : status===500 ?
                    <div className="alert alert-warning login-alert" role="alert">
                      <strong>Something goes wrong </strong>please try again
                    </div>
                    : <></>
                    }
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
          : role === 'admin' ?
            <>
            <Redirect to={'/admin'} />
            <AdminMenu logout={this.logout}></AdminMenu>
            </> :
            <UserMenu logout={this.logout}></UserMenu>
          }
        </nav>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (loginInfo) => dispatch(setToken(loginInfo)),
    logout: () => dispatch(delToken())
  }
}

const mapStateToProps = state => {
  return{
    token: state.auth.token,
    role: state.auth.role
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
