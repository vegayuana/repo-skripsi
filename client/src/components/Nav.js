import React, { PureComponent } from 'react'
import UserMenu from '../components/UserMenu'
import AdminMenu from '../components/AdminMenu'
import { Link, Redirect } from 'react-router-dom'
import { setToken, delToken} from '../reducers/authReducer'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap' 
import { FaRegCheckCircle } from 'react-icons/fa'
import '../styles/nav.css'
import axios from 'axios'
import $ from 'jquery'
import {scrollToTop} from '../helpers/autoScroll'
import MediaQuery from 'react-responsive'
import {Cookies} from 'react-cookie'
const cookie = new Cookies()

export class Nav extends PureComponent {
  state = {
    npm: '',
    pass: '',
    message: '',
    status: null,
    showLogin: false,
    showLoading:false,
    justLoggedIn:false, //ketika pertama kali login, agar refresh tidak redirect
  }
  componentDidMount(){
    if(cookie.get('token')){
      let log ={
        token : cookie.get('token'),
        role : cookie.get('role')
      }
      this.props.login(log)
    }
    $('a').click(()=>{
      $('.collapse').removeClass( 'show' )
    })
  }
  handleInput = (e) =>{
    this.setState({
      status:'',
      [e.target.id] : e.target.value
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
      console.log(loginInfo)
      if (loginInfo.isLogged){ //response didapat
        this.props.login(loginInfo) //set state global
        this.setState({ //show modal
          showLoading:false,
          status:res.data.status,
          justLoggedIn:true,
          showLogin:true,
        })
        scrollToTop()
        setTimeout(() => 
          this.setState({ //hide modal
            showLogin:false
        }), 1000)
      }
      else{
        this.setState({
          showLoading:false,
          status:500
        })
      }
    }).catch((err) => { 
      if(err.response){
        this.setState({
          message:err.response.data.message,
          status:err.response.data.status,
          showLoading:false,
        })
      } else{
        this.setState({
          status: 500,
          showLoading:false,
        })
      }
    }) 
  }
  logout = () =>{
    this.props.logout()
  }
  handleClose = () => {
    this.setState({
      showLogin:false
    })
  }
  render() {
    let { message, status, justLoggedIn } = this.state
    let { token, role } = this.props
    return (
      <>
      <nav className='navbar navbar-expand-md sticky-top navbar-dark'>
        <Link to='/' className='navbar-brand'>
          <p>
            REPO<span>SKRIPSI</span>
          </p>
        </Link>
        {!token ? 
          <>
          {/*Toggler*/}
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#toggle1'>
            <span className='navbar-toggler-icon'></span>
          </button>
          {/*Collapse Items*/}
          <div className='collapse navbar-collapse' id='toggle1'>
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <button className='btn btn-nav btn-transition dropdown' data-toggle='dropdown'>Masuk</button>
                <ul className='dropdown-menu login-form'>
                  <form className='form'>
                    <div className="padding-15">
                      <div className="row">
                        <div className="col-6 col-md-5 no-padding">
                          <input type='text' id='npm' className='form-control' placeholder='NPM' onChange={this.handleInput} required/>
                        </div>
                        <div className="col-6 col-md-5 no-padding">
                          <input type='password' id='pass' className='form-control' placeholder='Password' onChange={this.handleInput} required/>
                        </div>
                        <div className="col-12 col-md-2 no-padding">
                          <button type='submit' className='btn btn-primary' onClick={e => this.submitLogin(e)}>
                            Masuk
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <Link to="/forgot" className='nav-forgot'>Lupa Password</Link>
                      </div>
                    </div>
                    {status===400? 
                    <div className='alert alert-warning login-alert' role='alert'>
                      <strong>{message}</strong>
                    </div>
                    : status===500 ?
                    <div className='alert alert-danger login-alert' role='alert'>
                      <strong>Terjadi Kesalahan!</strong>Periksa koneksi anda dan coba lagi
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
          {/* justLoggedIn agar redirect ketika login tapi tidak ketika refresh */}
          {justLoggedIn? <Redirect to={'/admin'} /> :<></>}
          <AdminMenu logout={this.logout}></AdminMenu>
          </> 
          :
          <>
          {justLoggedIn? <Redirect to='/' /> : <></>}
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
          <Modal show={this.state.showLogin} onHide={this.handleClose} centered>
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