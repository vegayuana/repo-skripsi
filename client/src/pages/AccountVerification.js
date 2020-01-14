import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { Spinner, Breadcrumb, Table } from 'react-bootstrap';
import axios from 'axios';

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
    let { isLoaded, users} = this.state
    // if (!this.props.token){
    //   return <Redirect to={'/'} />
    // }
    return (
      <div className="main-box">
        <Breadcrumb>
          <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Verifikasi Akun Mahasiswa</Breadcrumb.Item>
        </Breadcrumb>
        <div>
        <h5>Data Mahasiswa</h5>
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
          { !isLoaded ? <td colspan="7" className="text-center"><Spinner animation="border"  variant="secondary" /></td> 
            :
            users ===undefined || users ===[] ? <td colspan="10" className="text-center">No Data</td> 
          :
          users.map((user, i) =>
            <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>{user.name}</td>
              <td>{user.npm}</td>
              <td>{user.ktm_url}</td>
              <td>{user.created_at}</td>
              <td>{user.is_active === 1 ? <>Diverifikasi </> :
                    user.is_active === 0 ? <>Tidak Diverifikasi</> :
                      <>Belum Diverifikasi</>
              }</td>
              <td>
                {user.is_active === 1 ?
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
                }
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
    token : state.auth.token
  }
};
export default connect(mapStateToProps, null)(AccountVerification);

