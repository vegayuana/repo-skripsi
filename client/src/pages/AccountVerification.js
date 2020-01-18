import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Spinner, Breadcrumb, Table } from 'react-bootstrap'
import axios from 'axios'

export class AccountVerification extends Component {
  state ={
    users: [],
    isLoaded: false
  }
  getData = () =>{
    axios({
      method: 'get',
      url: 'http://localhost:3000/admin/show-acc',
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
  }
  componentDidMount(){
    this.getData()
  }
  unverified = (id) => {
    axios({
      method: 'put',
      url: `http://localhost:3000/admin/unverified/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    })
    this.getData()
  }
  verified = (id) => {
    axios({
      method: 'put',
      url: `http://localhost:3000/admin/verified/${id}`,
      headers:{
        Authorization: this.props.token
      }
    })
    this.getData()
  }  
  render() {
    let { isLoaded, users} = this.state;
    let btnDisabled = "btn-table"
    console.table(users)
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
          <div className="title">Akun Mahasiswa</div> 
          <Table responsive striped size="sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">NPM</th>
                <th scope="col">KTM</th>
                <th scope="col">Waktu Daftar</th>
                <th scope="col">Status</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
            { !isLoaded ? <tr><td colSpan="7" className="text-center"><Spinner animation="border"  variant="secondary" /></td></tr>
              : users ===undefined || users ===[] ? <td colSpan="10" className="text-center">No Data</td> 
                :
              users.map((user, i) =>
              <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{user.name}</td>
                <td>{user.npm}</td>
                <td><img src={user.ktm_url}/></td>
                <td>{user.created_at}</td>
                <td>{user.is_active === 1 ? <>Diverifikasi </> :
                      user.is_active === 0 ? <>Tidak Diverifikasi</> :
                        <>Belum Diverifikasi</>
                }</td>
                <td>
                <>
                    <button onClick={()=>this.unverified( user.id)} className={user.is_active===2 ? "btn-table btn-danger" : btnDisabled} disabled={ user.is_active===2 ? false: true} >Tidak Terverifikasi</button>
                    <button onClick={()=>this.verified( user.id)} className={user.is_active===2 ?  "btn-table btn-handle" :btnDisabled}disabled={user.is_active===2 ? false:true} >Verifikasi </button>
                    </>                  {/* {user.is_active === 1 ?
                    <>
                    <button onClick={()=>this.unverified( user.id)} className="btn-table btn-danger" >Tidak Terverifikasi</button>
                    <button onClick={()=>this.verified( user.id)} className="btn-table btn-handle" disabled>Verifikasi </button>
                    </>
                    : user.is_active === 0 ?
                      <>
                      <button onClick={()=>this.unverified( user.id)} className="btn-table btn-danger" disabled >Tidak Terverifikasi</button>
                      <button onClick={()=>this.verified( user.id)} className="btn-table btn-handle" >Verifikasi </button>
                      </>
                      : <>
                        <button onClick={()=>this.unverified( user.id)} className="btn-table btn-danger">Tidak Terverifikasi</button>
                        <button onClick={()=>this.verified( user.id)} className="btn-table btn-handle" >Verifikasi </button>
                        </>
                  } */}
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