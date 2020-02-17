import React, { PureComponent } from 'react'
import UserMenu from '../components/UserMenu'
import AdminMenu from '../components/AdminMenu'
import { Link, Redirect } from 'react-router-dom'
import { setToken, delToken} from '../reducers/authReducer'
// import { Cookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap' 
import { FaRegCheckCircle } from 'react-icons/fa'
import '../styles/nav.css'
import axios from 'axios'
import $ from 'jquery'
import {scrollToTop} from '../helpers/autoScroll'
import MediaQuery from 'react-responsive'

export class Nav extends PureComponent {
  state = {
    npm: '',
    pass: '',
    token: '',
    role: '',
    message: '',
    status: null,
    showModal: false,
    showLoading:false,
    loginState:false
  }
  componentDidMount(){
    if(localStorage.getItem('token')){
      let log ={
        token : localStorage.getItem('token'),
        role : localStorage.getItem('role')
      }
      this.props.login(log)
    }
    $('a').click(()=>{
      $('.collapse').removeClass( 'show' )
    })
  }
  componentDidUpdate(prevProps){
    //props berubah akibat login / logout
    if(prevProps.token!== this.props.token){
      this.setState({
        token : this.props.token,
        role : this.props.role
      })
    }
  }
  handleChange = (e) =>{
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  handleClose = () => {
    this.setState({
      showModal:false
    })
  }
  submitLogin = e => {
    e.preventDefault()
    this.setState({
      showLoading:true
    })
    axios({
      method: 'post',
      url: '/login',
      data: {
        npm: this.state.npm,
        password: this.state.pass
      }
    }).then(res => {
      let loginInfo = res.data.data
      console.log ('login info', loginInfo)
      this.setState({
        showLoading:false
      })
      if (loginInfo){
        this.setState({
          status:res.data.status,
          showModal:true,
        })
        if (loginInfo.isLogged) {
          this.props.login(loginInfo)
          this.setState({
            loginState:true,
          })
        }
        scrollToTop()
        setTimeout(() => 
          this.setState({
            showModal:false
        }), 1000)
      }
      else{
        this.setState({
          status:500
        })
      }
    }).catch((err) => { 
      this.setState({
        showLoading:false
      })
      if(err.response){
        this.setState({
          message:err.response.data.message,
          status:err.response.data.status,
        })
      } else{
        this.setState({
          status: 500,
        })
      }
    }) 
  }
  logout = () =>{
    this.props.logout()
  }
  render() {
    let { token, role, message, status, loginState} = this.state
    return (
      <>
      <nav className='navbar navbar-expand-md sticky-top navbar-dark'>
        {/*Brand Name*/}
        <Link to='/' className='navbar-brand'>
          <p>
            REPO<span>SKRIPSI</span>
          </p>
        </Link>
        {!token ? 
          <>
          {/*Toggler*/}
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#toggle1' aria-controls='toggle' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          {/*Collapse Items*/}
          <div className='collapse navbar-collapse' id='toggle1'>
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <button className='btn btn-nav btn-transition dropdown' data-toggle='dropdown'>Masuk</button>
                <ul className='dropdown-menu login-form'>
                  <form className='form-inline'>
                    <input type='text' id='npm' className='form-control' placeholder='NPM' onChange={this.handleChange} required/>
                    <input type='password' id='pass' className='form-control' placeholder='Password' onChange={this.handleChange} required/>
                    <button type='submit' className='btn btn-primary' onClick={e => this.submitLogin(e)}>
                      Masuk
                    </button>
                    {status===400? 
                    <div className='alert alert-warning login-alert' role='alert'>
                      <strong>{message}</strong>
                    </div>
                    : status===500 ?
                    <div className='alert alert-danger login-alert' role='alert'>
                      <strong>Something goes wrong </strong>check your connection and try again
                    </div>
                    :               
                    <></>
                    }
                  </form>
                </ul>
              </li>
              <li className='nav-item'>
                <Link to='/register' className='btn btn-nav btn-transition'>
                  Register
                </Link>
              </li>
            </ul>
          </div>
          </> 
          :role === 'admin' ?
          <>
          {loginState===true ? <Redirect to={'/admin'} /> :<></>}
          <AdminMenu logout={this.logout}></AdminMenu>
          </> 
          :
          <>
          {loginState===true? <Redirect to='/' /> : <></>}
          <MediaQuery query='(min-device-width:768px)'>
            <UserMenu logout={this.logout}></UserMenu>  
          </MediaQuery>
          <MediaQuery query='(max-device-width:767px)'>
            <ul className='navbar-nav'>
              <li className='nav-item right'>
                <Link to='/' className='btn btn-nav btn-transition' onClick={()=>this.logout()}>
                  Log out
                </Link>
              </li>
            </ul>
          </MediaQuery>
          </>
          }
          <Modal show={this.state.showModal} onHide={this.handleClose} centered>
            <Modal.Body className='modal-box'>
            <div className='icon-check'><FaRegCheckCircle/></div>
              Log In Berhasil
            </Modal.Body>
          </Modal>
          <Modal show={this.state.showLoading} centered>
            <Modal.Body className='modal-box'>
              Sedang diproses ...
            </Modal.Body>
          </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Nav)