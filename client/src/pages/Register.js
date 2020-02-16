import React, { Component } from 'react'
import bg2 from '../icons/bg2.webp'
import axios from 'axios'
import {ProgressBar} from 'react-bootstrap'
export class Register extends Component {
  initialState = {
    npm: '', 
    pass:'',
    passCheck: '', 
    message: '', 
    status:'',
    displayForm1:'block',
    displayForm2:'none',
    displayForm3:'none',
    file:null,
    progress:34
  }
  state=this.initialState
  submit = (e) =>{
    e.preventDefault()
    let {npm, pass}= this.state
    let name = this.refs.name.value
    let data={
      name:name,
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
        progress: this.state.progress + 33
      })
    }).catch(err => {
      if (err.response) {
        this.setState({
          message: err.response.data.message,
          status: err.response.data.status
        })
      }
      else{
        this.setState({
          message: 'Network error, Check your connection',
          status: 500
        })
      }
    })
  }
  submitKTM = e => {
    e.preventDefault()
    let { npm, pass, file } = this.state
    let name = this.refs.name.value
    const formData = new FormData()
    formData.append('ktm', file)
    formData.append('npm', npm)
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
    }).catch(err => {
      if (err.response) {
        this.setState({
          message: err.response.data.message,
          status: err.response.data.status
        })
      }
      else{
        this.setState({
          message: 'Network error, Check your connection',
          status: 500
        })
      }
    })
  }
  handleInput = e => {
    this.setState({
      [e.target.id] : e.target.value,
    })
  }
  handleRetype = (e) =>{
    let {pass} = this.state
    if (e.target.value !== pass ){
      this.setState({
        passCheck: false
      })
    } else {
      this.setState({
        passCheck: true
      })
    }
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
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.message !== this.state.message ||
      nextState.status !== this.state.status ||
      nextState.npm !== this.state.npm ||
      nextState.progress !== this.state.progress
    ) {
      return true
    }
    if (nextState.passCheck === this.state.passCheck) {
      return false
    }
    return true
  }
  render() {
    let {npm, pass, passCheck, message, status} =this.state
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
                  <label> Name</label>
                  <input type='text' ref='name' className='form-control' placeholder='Name'/>
                </div>
                <div className='form-group'>
                  <label>NPM</label>
                  <input type='number' id='npm' onBlur={this.handleInput} className='form-control' placeholder='NPM'/>
                </div>
                {npm.length !== 12 && npm.length > 0 ? (
                  <div className='alert alert-warning' role='alert'>
                    <strong>NPM is incorrect! </strong>require 12 digits
                  </div>
                ) : (<></>)
                }
                <div className='form-group'>
                  <label>Password</label>
                  <input type='password' onBlur={this.handleInput} id='pass' className='form-control' placeholder='Password'/>
                </div>
                <div className='form-group'>
                  <label>Confirm Password</label>
                  <input type='password' onChange={this.handleRetype} className='form-control' placeholder='Password'/>
                </div>
                {passCheck === true || !pass ? ( <></> ) : (
                  <div className='alert alert-warning' role='alert'>
                    Password does not match
                  </div>
                )}
                <button type='submit' className='btn btn-primary' onClick={e => this.submit(e)} disabled={!passCheck}>
                  Submit
                </button>
                {message === '' ? ( <></> ) : (
                  <div className='alert alert-danger' role='alert'>
                    <strong>{this.state.message}</strong>
                  </div>
                )}
              </fieldset>
              <fieldset style={{ display: this.state.displayForm2, marginTop: '50px' }}>
                <div className='form-group'>
                  <label>Foto KTM</label>
                  <input type='file' id='ktm' onChange={this.handleFile} className='form-control-file' accept='.png, .jpg, .jpeg'/>
                </div>
                <button type='submit' className='btn btn-primary' onClick={e => this.submitKTM(e)} disabled={!passCheck}>
                  Submit
                </button>
                {message === '' ? (<></>) : (
                  <div className='alert alert-danger' role='alert'>
                    <strong>{this.state.message}</strong>
                  </div>
                )}
              </fieldset>
              <fieldset style={{ display: this.state.displayForm3, marginTop: '50px' }}>
                {status === 200 ? ( 
                  <div className='alert alert-success' style={{ textAlign: 'center' }} role='alert'>
                    <strong>{this.state.message}</strong> Please Log In
                  </div>
                ) : (<></>)}
                <button className='btn btn-primary' onClick={e => this.back(e)}>
                  Back
                </button>
              </fieldset>
            </form>
          </div>
          <div className='col-xl-3'></div>
        </div>
      </>
    )
  }
}
export default Register
