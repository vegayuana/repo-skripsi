import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import Bg3 from '../components/Bg3'

class EmailVerification extends Component {
  state={
    offline:false,
    isSent:false,
    status:null,
    message:''
  }
  sendVerification=()=>{
    let id = this.props.match.params.id
    axios({
      method: 'get',
      url: '/verify-email/',
      params:{
        id : id
      },
    }).then(res => {
      console.log(res)
      this.setState({
        isSent:true,
        status:res.data.status,
        message:res.data.message
      })
    }).catch(err => {
      if (err.response) {
        this.setState({
          isSent:true,
          status: err.response.data.status,
          message: err.response.data.message,
        })
      }
    })
  }
  componentDidMount(){
    if (navigator.onLine){
      this.sendVerification()
      this.setState({
        offline:false
      })
    }
    else{
      this.setState({
        offline:true,
      })
    }
  }
  render() {
    let { offline, isSent, status, message } = this.state
    if (this.props.token){
      return <Redirect to={'/'} />
    }
    return (
      <>
      <Bg3/>
      <div className="main-box">
        <div className="info-box">
          {offline? <p>Anda sedang offline. Cek koneksi anda dan refresh </p>
          : !isSent ? <div className="spin-box"><Spinner animation="border" variant="secondary"/></div>
          : <>
            <p><b>{message}</b></p>
            {status===200? <><p className="no-margin">Akun akan ditinjau oleh admin</p><p>Pemberitahuan aktivasi akun akan dikirimkan ke email anda</p></>
            : <p>Silahkan register ulang untuk untuk mendapatkan link verifikasi dengan token yang valid</p> 
            }
            </>
          }
        </div>
      </div>
      </>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
  }
}
export default connect(mapStateToProps, null)(EmailVerification)