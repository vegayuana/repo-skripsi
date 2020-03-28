import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Spinner, Breadcrumb, Table, Modal} from 'react-bootstrap'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import { FaCheck, FaSearch} from 'react-icons/fa'
import moment from 'moment'

export class AccountVerification extends Component {
  state ={
    users: [],
    usersFiltered:[],
    isLoaded: false,
    offline:false,
    showModal: false,
    showLoading:false,
    showAlert:false,
    id:'',
    message:''
  }
  getData = () =>{
    axios({
      method: 'get',
      url: '/admin/show-acc',
      headers: {
        Authorization:this.props.token
      } 
    }).then( res=>{
      this.setState({ 
        users: res.data,
        usersFiltered:res.data,
        isLoaded: true
      })
    }).catch((err) => { 
      if(err.response){
      console.log(err.response.statusText)
      }
    })
  }
  componentDidMount(){
    scrollToTop()
    if (navigator.onLine){
      this.getData()
      this.setState({
        offline:false
      })
    }
    else{
      this.setState({
        isLoaded:true,
        offline:true,
      })
    }
  }
  deleteAcc = (id) => {
    this.setState({
      showLoading:true
    })
    axios({
      method: 'delete',
      url: `/admin/delete-acc/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    }).then(()=>{
      this.setState({
        showModal:false,
        showLoading:false
      })
      this.getData()
    }).catch((err) => { 
      this.setState({
        showModal:false,
        showLoading:false,
        showAlert:true
      })
      if(err.response){
        console.log(err.response)
        this.setState({
          message:err.response.data.message
        })
      }
    })
  }
  activated = (id) => {
    this.setState({
      showLoading:true
    })
    axios({
      method: 'put',
      url: `/admin/activated/${id}`,
      headers:{
        Authorization: this.props.token
      }
    }).then(res=>{
      this.setState({
        showLoading:false
      })
      this.getData()
    }).catch((err) => { 
      this.setState({
        showLoading:false,
        showAlert:true
      })
      if(err.response){
        console.log(err.response)
        this.setState({
          message:err.response.data.message
        })
      }
    })
  }  
  onChange =(e)=>{
    let text = e.target.value.toLowerCase().trim()
    let {users} = this.state
    const filteredData = users.filter(item => {
      return item.name.toLowerCase().includes(text) || item.npm.includes(text)
    })
    this.setState({
      usersFiltered:filteredData,
    }) 
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
      showAlert:false,
      message:''
    })
  }
  render() {
    let { isLoaded, offline, usersFiltered, message} = this.state
    if (!this.props.token || this.props.role==='user'){
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
          <div className="title">
            <div className="row">
              <div className="col-md-9 col-6 table-header">Akun Mahasiswa</div>
              <div className="col-md-3 col-6">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2"><FaSearch/></button>
                  </div>
                  <input type="text" className="form-control" onChange={this.onChange} placeholder="Nama atau NPM" aria-label="search" aria-describedby="button-addon2" />
                </div>
              </div>
            </div>
          </div> 
          <Table responsive striped size="sm" className="table-borderless">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col" className="td-sm">Nama</th>
                <th scope="col" className="td-sm">NPM</th>
                <th scope="col" className="td-sm">Email</th>
                <th scope="col" className="td-md">KTM</th>
                <th scope="col" className="td-md">Waktu Daftar</th>
                <th scope="col" className="td-md">Waktu Diproses</th>
                <th scope="col" className="td-md">Status</th>
                <th scope="col" className="td-md">Handle</th>
              </tr>
            </thead>
            <tbody>
            { !isLoaded ? <tr><td colSpan="7" className="text-center"><Spinner animation="border"  variant="secondary" /></td></tr>
              : offline ? <tr><td colSpan="10" className="text-center offline-text">Anda sedang offline. Cek koneksi anda dan refresh </td></tr>
              : !usersFiltered? <tr><td colSpan="10" className="text-center">No Data</td></tr>
              : usersFiltered.map((user, i) =>
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{user.name}</td>
                <td>{user.npm}</td>
                <td>{user.email}</td>
                <td>
                  {!user.ktm_url ? <>Tidak ada KTM</>:
                  <img style={{maxWidth:'150px', width:'100%' }}alt="ktm" src={'https://repositori-skripsi.herokuapp.com/' + user.ktm_url}/>
                  }
                </td>
                <td>{moment(user.created_at).format("YYYY-MM-D H:mm:ss")}</td>
                <td>{user.is_active === 0 ? <>-</> : <>{moment(user.processed_at).format("YYYY-MM-D H:mm:ss")}</>}</td>
                <td>{user.is_active === 1 ? <p className='status status-green'><FaCheck/> Aktif</p> :<p className='status status-muted'>Belum Diproses</p>}</td>
                <td>
                  <button onClick={()=>this.activated(user.npm)} className={ user.is_active === 1? "col-12 col-md-6 btn-table": "col-12 col-md-6 btn-table btn-primary"} disabled={ user.is_active === 1? true : false}>Aktifkan</button>
                  <button onClick={()=>this.handleShow(user.npm)} className={ user.is_active === 1? "col-12 col-md-6 btn-table" : "col-12 col-md-6 btn-table btn-danger" } disabled={ user.is_active === 1 ? true : false}>Hapus</button>
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
            <button onClick={()=>this.deleteAcc(this.state.id)} className="btn-table btn-primary">Ya</button>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.showLoading} centered>
          <Modal.Body className='modal-box'>
            Sedang diproses ...
          </Modal.Body>
        </Modal>
        <Modal show={this.state.showAlert} onHide={this.handleClose} centered>
          <Modal.Body className='modal-box'>
            <p className="text-danger">{message? <>{message}</> : <>Gagal! </>} Silahkan ulangi</p>
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