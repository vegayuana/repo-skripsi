import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Spinner, Breadcrumb, Table } from 'react-bootstrap'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import { FaCheck, FaTimes} from 'react-icons/fa'

export class AccountVerification extends Component {
  state ={
    users: [],
    isLoaded: false
  }
  getData = () =>{
    axios({
      method: 'get',
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
      console.log(err.response.statusText)
    })
  }
  componentDidMount(){
    this.getData()
    scrollToTop()
  }
  unverified = (id) => {
    axios({
      method: 'put',
      url: `/admin/unverified/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    }).catch((err) => { 
      console.log(err.response.statusText)
    })
    this.getData()
  }
  verified = (id) => {
    axios({
      method: 'put',
      url: `/admin/verified/${id}`,
      headers:{
        Authorization: this.props.token
      }
    }).catch((err) => { 
      console.log(err.response.statusText)
    })
    this.getData()
  }  
  shouldComponentUpdate(nextState){
    if (nextState!=this.state){
      return true
    }
    return false
  }
  render() {
    let { isLoaded, users} = this.state
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
                  <img style={{maxWidth:'150px', width:'100%' }}alt="ktm" src={user.ktm_url}/>
                </td>
                <td><p>{user.created_at.split('T')[0]} {user.created_at.split('T')[1].split('.000Z')}</p></td>
                <td>{user.is_approved===2 ? <></> : <p>{user.processed_at.split('T')[0]} {user.processed_at.split('T')[1].split('.000Z')}</p>}</td>
                <td>{user.is_active === 1 ? <div style={{color:'#379683'}}><FaCheck/> Diverifikasi</div> :
                      user.is_active === 0 ? <div className='text-danger'><FaTimes/> Tidak Diverifikasi</div> :
                        <>Belum Diverifikasi</>
                }</td>
                <td>
                  <button onClick={()=>this.unverified( user.id)} className={ user.is_active === 0? "btn-table" : "btn-table btn-danger" }  disabled={ user.is_active === 0? true : false}>Tidak Terverifikasi</button>
                  <button onClick={()=>this.verified( user.id)} className={ user.is_active === 1? "btn-table": "btn-table btn-handle"} disabled={ user.is_active === 1? true : false}>Verifikasi</button>
                </td>
              </tr>
              )
            }
            </tbody>
          </Table>
        </div>
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