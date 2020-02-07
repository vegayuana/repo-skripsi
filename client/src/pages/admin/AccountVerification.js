import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Spinner, Breadcrumb, Table, Modal} from 'react-bootstrap'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import { FaCheck } from 'react-icons/fa'

export class AccountVerification extends Component {
  state ={
    users: [],
    isLoaded: false,
    showModal: false,
    id:'',
    message:''
  }
  getData = () =>{
    axios({
      method: 'get',
      baseURL: 'http://localhost:5000',
      url: '/admin/show-acc',
      headers: {
        Authorization: this.props.token
      } 
    })
    .then( res=>{
      this.setState({ 
        users: res.data,
        isLoaded: true
      })
    })
    .catch((err) => { 
      if(err.response){
      console.log(err.response.statusText)
      }
    })
  }
  componentDidMount(){
    this.getData()
    scrollToTop()
  }
  unverified = (id) => {
    axios({
      method: 'delete',
      baseURL: 'http://localhost:5000',
      url: `/admin/unverified/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    }).then(res=>{
        console.log(res.data)
        this.setState({
          showModal:false
        })
    }).catch((err) => { 
      if(err.response){
        console.log(err.response)
        this.setState({
          message:err.response.data.message
        })
      }
    })
    this.getData()
  }
  verified = (id) => {
    axios({
      method: 'put',
      baseURL: 'http://localhost:5000',
      url: `/admin/verified/${id}`,
      headers:{
        Authorization: this.props.token
      }
    }).catch((err) => { 
      if(err.response){
      console.log(err.response.statusText)
      }
    })
    this.getData()
  }  
  handleShow = (id) =>{
    this.setState({
      showModal:true,
      id:id
    })
  }
  handleClose = () => {
    this.setState({
      showModal:false,
      message:''
    })
  }
  render() {
    let { isLoaded, users} = this.state
    console.log(users)
    if (!localStorage.getItem('token') || this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Breadcrumb.Item active> / Verifikasi Akun Mahasiswa</Breadcrumb.Item>
        </Breadcrumb>
        <div className="table-box">
          <div className="line"></div> 
          <div className="title">Akun Mahasiswa</div> 
          <Table responsive striped size="sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">NPM</th>
                <th scope="col">KTM</th>
                <th scope="col">Waktu Daftar</th>
                <th scope="col">Waktu Diproses</th>
                <th scope="col">Status</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
            { !isLoaded ? <tr><td colSpan="7" className="text-center"><Spinner animation="border"  variant="secondary" /></td></tr>
              : !users? <tr><td colSpan="10" className="text-center">No Data</td></tr>
                :
              users.map((user, i) =>
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{user.name}</td>
                <td>{user.npm}</td>
                <td>
                  {!user.ktm_url ? <>Tidak ada KTM</>:
                  <img style={{maxWidth:'150px', width:'100%' }}alt="ktm" src={'http://localhost:5000/' + user.ktm_url}/>
                  }
                </td>
                <td>{user.created_at.split('T')[0]} {user.created_at.split('T')[1].split('.000Z')}</td>
                <td>{user.is_active === 0 ? <>-</> : <>{user.processed_at.split('T')[0]} {user.processed_at.split('T')[1].split('.000Z')}</>}</td>
                <td>{user.is_active === 1 ? <div style={{color:'#379683'}}><FaCheck/> Diverifikasi</div> :<>Belum Diverifikasi</>}</td>
                <td>
                  <button onClick={()=>this.verified( user.id)} className={ user.is_active === 1? "btn-table": "btn-table btn-handle"} disabled={ user.is_active === 1? true : false}>Verifikasi</button>
                  <button onClick={()=>this.handleShow(user.id)} className={ user.is_active === 1? "btn-table" : "btn-table btn-danger" } disabled={ user.is_active === 1 ? true : false}>Tidak Terverifikasi</button>
                </td>
              </tr>
              )
            }
            </tbody>
          </Table>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <Modal.Body className='admin-modal'>
            <p>Apakah anda yakin data akun tersebut tidak valid?</p>
            {!this.state.message? <></> :
            <div className="alert alert-warning" role="alert">
              <strong>{this.state.message}</strong>
            </div> }
            <button onClick={()=>this.unverified(this.state.id)} className="btn-table btn-primary">Ya</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
    role: state.auth.role
  }
}
export default connect(mapStateToProps, null)(AccountVerification)