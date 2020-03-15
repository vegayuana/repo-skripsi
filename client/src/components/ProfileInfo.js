import React, { Component } from 'react'
import { Spinner, Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'

export class ProfileInfo extends Component {
  state={
    user:{},
    isLoaded:false,
    showLoading:false,
    offline:false,
    newPass:'',
    oldPass:'',
    message:'',
    status:null,
    passCheck:''
  }
  getProfile= ()=>{
    axios({
      method: 'get',
      url: `/user/profile/`,
      headers: {
        Authorization: this.props.token
      } 
    })
    .then(res=>{
      this.setState({ 
        user: res.data,
        isLoaded: true
      })
    }).catch(err=>{
      console.log(err.response)
    })
  }
  componentDidMount(){
    if (navigator.onLine){
      this.getProfile()
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
  submit=(e)=>{
    e.preventDefault()
    this.setState({
      showLoading:true
    })
    let { newPass, oldPass } = this.state
    axios({
      method: 'put',
      url: `/user/edit-pass`,
      headers:{
        Authorization: this.props.token
      },
      data: {
        newPass:newPass,
        oldPass:oldPass
      }
    }).then(res => {
      this.refs.editForm.reset();
      this.setState({
        newPass:'',
        oldPass:'',
        message:res.data.message,
        status:res.data.status,
        showLoading:false
      })
    }).catch((err) => { 
      this.setState({
        showLoading:false
      })
      if(err.response){
        this.setState({
          message:err.response.data.message,
          status:err.response.data.status,
        })
      }
    })
  }
  handleInput = (e) =>{
    this.setState({
       [e.target.id]: e.target.value,
    })
    if(e.target.id==='newPass' && this.refs.confirmPass.value){
      if(e.target.value!==this.refs.confirmPass.value){
        this.setState({passCheck: false})
      }
      else{
        this.setState({passCheck: true})
      }
    }
  }
  handleRetype = (e) =>{
    if (e.target.value !== this.state.newPass){
      this.setState({passCheck: false})
    }
    else{
      this.setState({passCheck: true})
    }
  }
  clear = (e) =>{
    this.refs.editForm.reset()
    this.setState({
      newPass:'',
      oldPass:'',
      message:'',
      status:null,
      passCheck:''  
    })
  }
  render() {
    let { user, isLoaded, oldPass, newPass, passCheck, status, message, offline} = this.state
    return (
      <div>
      {offline? <p>Anda sedang offline. Cek koneksi anda dan refresh </p>
      : !isLoaded ? <div className="spin-box"><Spinner animation="border" variant="secondary"/></div>
      : <>
      <div className="row">
        <div className="col-md-5 img-div"> 
          <div className="img-box"><img src={user.ktm_url} alt='ktm'className='ktm'/></div>
        </div>
        <div className="col-md-7">
          <h5><b>Nama</b></h5>
          <p className='column'>{user.name}</p>
          <h5><b>NPM</b></h5>
          <p className='column'>{user.npm}</p>
          <h5><b>Waktu diaktifkan</b></h5>
          <p className='column'>{moment(user.processed_at).format("YYYY-MM-D H:mm:ss")}</p>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editPass">Edit Password</button>
        
        </div>
      </div>
        
       
        {/* Edit Password Modal */}
        <div className="modal fade" id="editPass" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Password</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form ref='editForm'>
                <div className="form-group">
                  <label>Password Lama</label>
                  <input type="password" id="oldPass" className="form-control" placeholder="Password" onBlur={this.handleInput} />
                </div>
                <div className="form-group">
                  <label>Password Baru</label>
                  <input type="password" id="newPass" className="form-control" placeholder="Password" onChange={this.handleInput}/>
                </div>
                <div className="form-group">
                  <label>Konfirmasi Password Baru</label>
                  <input type="password" ref='confirmPass' className="form-control" placeholder="Konfirmasi Password" onChange={this.handleRetype}/>
                </div>
                { passCheck === false ?
                  <div className="alert alert-warning" role="alert">
                    Password tidak cocok
                  </div> : <></>}
                {status===400? 
                    <div className="alert alert-danger" role="alert">
                      <strong>{message}</strong>
                    </div>
                  :status===200? 
                    <div className="alert alert-success" role="alert">
                      <strong>{message}</strong>
                    </div>
                  :<></>
                }
                <button type="button" className="btn btn-danger mr-2" data-dismiss="modal" onClick={this.clear}>{ status===200? <>Tutup</> : <>Batalkan</>}</button>
                { status===200? <></> :
                <button type="button" className="btn btn-primary" onClick={this.submit} disabled={!passCheck || !newPass || !oldPass || !this.refs.confirmPass.value}>Simpan Perubahan</button>
                }
                </form>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.showLoading} centered>
          <Modal.Body className='modal-box'>
            Sedang diproses ...
          </Modal.Body>
        </Modal>
        </>
      }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token
  }
}
export default connect(mapStateToProps, null)(ProfileInfo)