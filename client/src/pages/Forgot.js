import React, { Component } from 'react'
import {Spinner} from 'react-bootstrap'
import Bg3 from '../components/Bg3'
import axios from 'axios'

export class Forgot extends Component {
  state={
    email:'', 
    npm:'',
    checknpm:'',
    displaySection1:'block',
    displaySection2:'none',
    sending:false,
    status:'',
    message:''
  }
  handleInput = e => {
    this.setState({
      [e.target.id] : e.target.value,
    })
  }
  checkNpm = e =>{
    this.setState({
      checknpm : e.target.value,
    })
  }
  sendEmail = e =>{
    e.preventDefault()
    this.setState({
      sending:true
    })
    axios({
      method: 'put',
      url: '/forgot-pass',
      data: {
        npm: this.state.npm,
        email: this.state.email
      }
    }).then(res => {
      // this.refs.forgotForm.reset();
      console.log('helo', res.data)
      this.setState({
        sending:false,
        status:res.data.status,
        message:res.data.message,
        displaySection1:'none',
        displaySection2:'block'
      })
    }).catch((err) => { 
      console.log(err.response)
      if(err.response){
        this.setState({
          status:err.response.data.status,
          message:err.response.data.message
        })
      }
      this.setState({
        sending:false,
      })
    })
  }
  render() {
    let {status, message, displaySection1, displaySection2, sending, email, npm, checknpm} = this.state
    console.log(this.state)
    return (
      <>
      <Bg3/>
      <div className="main-box">
        <div className='info-box forgot-box'>
            <h3>Lupa Password</h3>
            <form ref='forgotForm' autoComplete='off'>
            <fieldset style={{ display: displaySection1 }}>
                <label className='forgot-text'>Masukan Npm dan Email yang terdaftar</label>
                <div className='form-group'>
                  <input type='email' id='email' onBlur={this.handleInput} className='form-control' placeholder='Email'/>
                </div>
                {email.length>0 && !email.includes('@')? 
                  <div className='alert alert-warning' role='alert'>
                    <strong>Mohon inputkan Email yang valid</strong>
                  </div>
                  :<></>
                }
                <div className='form-group'>
                  <input type='number' id='npm' onBlur={this.checkNpm} onChange={this.handleInput} className='form-control' placeholder='NPM'/>
                </div>
                {checknpm.length !== 12 && checknpm.length > 0 ? 
                  <div className='alert alert-warning' role='alert'>
                    <strong>NPM salah! </strong>memerlukan 12 digit
                  </div>
                 : <></>
                }
                {!message?<></>:
                  <div className='alert alert-warning' role='alert'>
                    <strong>{message}</strong>
                    {status===422? <p>Cek kembali email dan npm yang anda masukan</p> : <></>}
                  </div>
                }
                { sending? 
                <button type='submit' className='btn btn-primary' disabled={true}>
                  <div className="spin-box"><Spinner animation="border" className="spin-forgot"/></div>
                </button>
                : <button type='submit' className='btn btn-primary' onClick={e => this.sendEmail(e)} 
                  disabled={!npm || npm.length!==12 || !email || !email.includes('@')}>
                    Kata Sandi Baru 
                  </button>
                }
              </fieldset>
              <fieldset style={{ display: displaySection2}}>
                <p><b>{message}!</b></p>
                <div>Cek email anda untuk mendapatkan password baru</div> 
              </fieldset>
            </form>
        </div>
      </div>
      </>
    )
  }
}

export default Forgot
