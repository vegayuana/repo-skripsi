import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner, Table, Breadcrumb, Modal} from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import { FaFilePdf, FaCheck, FaTimes} from 'react-icons/fa'
import moment from 'moment'

export class SkripsiVerification extends Component {
  state ={
    skripsi: [],
    isLoaded: false,
    offline:false,
    showModal: false,
    showLoading:false,
    showAlert:false,
    message:'',
    id:''
  }
  getData= ()=>{
    axios({
      method: 'get',
      url: '/admin/show-skripsi',
      headers: {
        Authorization: localStorage.getItem('token')
      } 
    }).then(res=>{
      this.setState({ 
        skripsi: res.data,
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
  unapproved = (id) => {
    this.setState({
      showLoading:true
    })
    axios({
      method: 'put',
      url: `/admin/unapproved/${id}`,
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
        console.log(err.response.statusText)
        this.setState({
          message:err.response.data.message
        })
      }
    })
  }
  approved = (id) => {
    this.setState({
      showLoading:true
    })
    axios({
      method: 'put',
      url: `/admin/approved/${id}`,
      headers: {
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
    let { isLoaded, skripsi, offline, message} = this.state
    if (!localStorage.getItem('token')|| this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Breadcrumb.Item active> / Tinjau Skripsi</Breadcrumb.Item>
        </Breadcrumb>
        <div className="table-box">
          <div className="line"></div> 
          <div className="title">Data Skripsi</div>
          <Table className="table-skripsi" responsive striped bordered size="sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col" className="td-lg">Judul</th>
                <th scope="col" className="td-md">Penulis</th>
                <th scope="col" className="td-sm">Tahun</th>
                <th scope="col" className="td-lg">Abstrak</th>
                <th scope="col" className="td-sm">File</th>
                <th scope="col" className="td-md">Status</th>
                <th scope="col" className="td-sm">Waktu Unggah</th>
                <th scope="col" className="td-sm">Waktu Diproses</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
            { !isLoaded ? <tr><td colSpan="10" className="text-center"><Spinner animation="border" variant="secondary" /></td></tr>
              : offline ? <tr><td colSpan="10" className="text-center offline-text">Anda sedang offline. Cek koneksi anda dan refresh </td></tr>
              : !skripsi ? <tr><td colSpan="10" className="text-center">No Data</td></tr> 
              : skripsi.map((item, i) => 
                <tr key={i}>
                  <th scope="row">{i+1}</th>
                  <td>{item.title}</td>
                  <td>{item.name}</td>
                  <td>{item.published_year}</td>
                  <td><div style={{height:'200px', overflowY:'scroll'}}>{item.abstract}</div></td>
                  <td>
                    {!item.file_url ? <>File Tidak ada</> :
                    <a href={'https://repositori-skripsi.herokuapp.com/'+item.file_url} target='_blank' rel='noreferrer noopener'><FaFilePdf className='icons'/> Klik</a>
                    }
                  </td>
                  <td>{ item.is_approved === 1 ? <div style={{color:'#379683'}}><FaCheck/> Dipublikasikan</div> : 
                          item.is_approved === 0 ? <div className='text-danger'><FaTimes/> Ditolak</div> :
                            <>Perlu Ditinjau</>
                        }</td>
                  <td>{moment(item.uploaded_at).format("YYYY-MM-D H:mm:ss")}</td>
                  <td>{item.is_approved===2 ? <></> : <>{moment(item.processed_at).format("YYYY-MM-D H:mm:ss")}</>}</td>
                  <td>
                    <button onClick={()=>this.handleShow(item.id)} className={ item.is_approved === 0? "btn-table" : "btn-table btn-danger" }  disabled={ item.is_approved === 0? true : false}>Tolak</button>
                    <button onClick={()=>this.approved(item.id)} className={ item.is_approved === 2? "btn-table btn-handle": "btn-table"} disabled={ item.is_approved === 2? false : true}>Publikasikan</button>
                  </td>
                </tr>
              )
            }
            </tbody>
          </Table>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <Modal.Body className='admin-modal'>
            <p>Apakah anda yakin untuk menolak publikasi skripsi?</p>
            <button onClick={()=>this.unapproved(this.state.id)} className="btn-table btn-primary">Ya</button>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.showLoading} centered>
          <Modal.Body className='modal-box'>
            Sedang diproses ...
          </Modal.Body>
        </Modal>
        <Modal show={this.state.showAlert} onHide={this.handleClose} centered>
          <Modal.Body className='modal-box'>
            <p className="text-danger">{message? <>{message}</> : <>Gagal! </>}. Silahkan ulangi</p>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token: state.auth.token,
    role: state.auth.role
  }
}
export default connect(mapStateToProps, null)(SkripsiVerification)