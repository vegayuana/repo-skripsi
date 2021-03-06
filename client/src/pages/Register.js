import React, { Component } from 'react'
import bg2 from '../icons/bg2.png'
import axios from 'axios'
import { scrollToTop } from '../helpers/autoScroll'
import { ProgressBar, Modal} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export class Register extends Component {
  initialState = {
    showLoading:false,
    name:'',
    npm: '', 
    email:'',
    pass:'',
    rePass: '', 
    message: '', 
    status:'',
    displayForm1:'block',
    displayForm2:'none',
    displayForm3:'none',
    file:null,
    progress:34
  }
  state=this.initialState
  next = (e) =>{
    e.preventDefault()
    this.setState({
      showLoading:true,
    })
    let {name, npm, pass, email}= this.state
    let data={
      name:name,
      email:email,
      npm:npm,
      password:pass
    }
    axios({
      method: 'POST',
      url: '/check-form',
      data: data
    }).then(res => {
      this.setState({
        message: '',
        displayForm1: 'none',
        displayForm2: 'block',
        progress: this.state.progress + 33,
        showLoading:false
      })
      scrollToTop()
    }).catch(err => {
      this.setState({
        showLoading:false
      })
      if (err.response) {
        this.setState({
          message: err.response.data.message,
          status: err.response.data.status,
        })
      }
      else{
        this.setState({
          message: 'Network error, Cek Koneksi Anda',
          status: 500,
        })
      }
    })
  }
  submitKTM = e => {
    e.preventDefault()
    this.setState({
      showLoading:true,
    })
    let { name, npm, pass, file, email } = this.state
    const formData = new FormData()
    formData.append('ktm', file)
    formData.append('npm', npm)
    formData.append('email', email)
    formData.append('name', name)
    formData.append('password', pass)
    console.log(file)
    axios({
      method: 'POST',
      url: '/register',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      this.setState(this.initialState)
      this.setState({
        displayForm1: 'none',
        displayForm2: 'none',
        displayForm3: 'block',
        message: res.data.message,
        status: res.data.status,
        progress: 100
      })
      this.refs.registerForm.reset()
      scrollToTop()
    }).catch(err => {
      this.setState({
        showLoading:false
      })
      if (err.response) {
        this.setState({
          message: err.response.data.message,
          status: err.response.data.status,
        })
      }
      else{
        this.setState({
          message: 'Network error, Cek Koneksi anda',
          status: 500,
        })
      }
    })
  }
  handleInput = e => {
    this.setState({
      [e.target.id] : e.target.value,
    })
  }
  handleFile = e => {
    if (e.target.files[0]) {
      this.setState({
        file: e.target.files[0]
      })
    } else {
      this.setState({
        file: ''
      })
    }
  }
  back = e => {
    e.preventDefault()
    this.setState(this.initialState)
  }
  render() {
    let {name, npm, email, pass, rePass, message, status, showLoading} =this.state
    if (this.props.token){
      return <Redirect to={'/'} />
    }
    return (
      <>
        <img src={bg2} alt='Logo' className='bg2' />
        <div className='row no-margin'>
          <div className='col-xl-9 col-lg-12 register-box'>
            <h3>Register</h3>
            <form ref='registerForm' autoComplete='off'>
              <div>
                <ProgressBar now={this.state.progress} />
              </div>
              <fieldset style={{ display: this.state.displayForm1 }}>
                <div className='form-group'>
                  <label>Nama</label>
                  <input type='text' id='name' onBlur={this.handleInput} className='form-control' placeholder='Nama'/>
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input type='text' id='email' onBlur={this.handleInput} className='form-control' placeholder='Email'/>
                </div>
                {email && !email.includes('@')? 
                  <div className='alert alert-warning' role='alert'>
                    Mohon inputkan Email yang valid
                  </div>
                  :<></>
                }
                <div className='form-group'>
                  <label>NPM</label>
                  <input type='number' id='npm' onBlur={this.handleInput} className='form-control' placeholder='NPM'/>
                </div>
                {npm.length !== 12 && npm ? 
                  <div className='alert alert-warning' role='alert'>
                    <strong>NPM tidak valid! </strong>memerlukan 12 digit
                  </div>
                 : <></>
                }
                <div className='form-group'>
                  <label>Password</label>
                  <input type='password' onChange={this.handleInput} id='pass' className='form-control' placeholder='Password'/>
                </div>
                {pass.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*]{8,25})$/) || !pass ? <></> : 
                  <div className='alert alert-warning' role='alert'>
                    Password memerlukan 8-25 karakter. Memiliki 1 angka, 1 uppercase, dan 1 lowercase
                  </div>
                }
                <div className='form-group'>
                  <label>Konfirmasi Password</label>
                  <input type='password' onChange={this.handleInput} id='rePass' className='form-control' placeholder='Password'/>
                </div>
                {rePass === pass || !rePass ? ( <></> ) : (
                  <div className='alert alert-warning' role='alert'>
                    Password tidak cocok
                  </div>
                )}
                <button type='next' className='btn btn-primary' onClick={e => this.next(e)} 
                disabled={!name || 
                          !npm || npm.length!==12 || 
                          !email || !email.includes('@') ||
                          !pass || !pass.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*]{8,25})$/) ||
                          !rePass || rePass!==pass }>
                  Lanjut
                </button>
                {message === '' ? ( <></> ) : (
                  <div className='alert alert-danger' role='alert'>
                    <strong>{this.state.message}</strong>
                  </div>
                )}
              </fieldset>
              <fieldset style={{ display: this.state.displayForm2 }}>
                <div className='form-group'>
                  <label>Foto KTM (Maks 5Mb)</label>
                  <input type='file' id='ktm' onChange={this.handleFile} className='form-control-file' accept='.png, .jpg, .jpeg'/>
                </div>
                <button type='submit' className='btn btn-primary' onClick={e => this.submitKTM(e)}>
                  Submit
                </button>
                {message === '' ? (<></>) : (
                  <div className='alert alert-danger' role='alert'>
                    <strong>{this.state.message}</strong>
                  </div>
                )}
              </fieldset>
              <fieldset style={{ display: this.state.displayForm3}}>
                {status === 200 ? ( 
                  <div className="text-center register-text" style={{marginBottom:'20px'}}>
                    <p><b>{this.state.message}</b></p>
                    <label>Silahkan cek email anda untuk mendapatkan link verifikasi</label>
                    <label>Link akan aktif selama 30 menit kedepan</label>
                  </div>
                ) : (<></>)}
                <button className='btn btn-primary' onClick={e => this.back(e)}>
                  Kembali
                </button>
              </fieldset>
            </form>
          </div>
          <div className='col-xl-3'></div>
          <Modal show={showLoading} centered>
            <Modal.Body className='modal-box'>
              Sedang diproses...
            </Modal.Body>
          </Modal>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return{
    token: state.auth.token
  }
}
export default connect(mapStateToProps, null)(Register)