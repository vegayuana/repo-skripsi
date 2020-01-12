import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import axios from 'axios';

export class VerifikasiAkun extends Component {
  state ={
    users: [],
    isLoaded: true,
    update:false,
  }
  componentDidMount(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/admin/show',
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
  unverified = (id) => {
    var _self = this
    axios({
      method: 'put',
      url: `http://localhost:3000/admin/unverified/${id}`,
    })
    .then(res=>{
      _self.setState({ 
        update: true
      })
    })
  }

  verified = (id) => {
    var _self = this
    axios({
      method: 'put',
      url: `http://localhost:3000/admin/verified/${id}`,
    })
    .then(res=>{
      _self.setState({ 
        update: true
      })
    })
  }  

  render() {
    let { isLoaded, users} = this.state
    if (!this.props.token){
      return <Redirect to={'/'} />
    }
    return (
      <div className="container">
        <div>
        <h5>Data Mahasiswa</h5>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">NPM</th>
            <th scope="col">KTM</th>
            <th scope="col">Status</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          { isLoaded ? 
          users.map((user, i) =>
            <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>{user.name}</td>
              <td>{user.npm}</td>
              <td>{user.ktm_url}</td>
              <td>{user.is_active === 1 ? <p>Diverifikasi </p> :
                    user.is_active === 0 ? <p>Tidak Diverifikasi</p> :
                      <p>Belum Diverifikasi</p>
              }</td>
              <td>
                {user.is_active === 1 ?
                  <>
                  <button onClick={()=>this.unverified(user.id)} className="btn btn-danger" >Tidak Terverifikasi</button>
                  <button onClick={()=>this.verified(user.id)} className="btn btn-handle" disabled>Verifikasi </button>
                  </>
                  : user.is_active === 0 ?
                    <>
                    <button onClick={()=>this.unverified(user.id)} className="btn btn-danger" disabled >Tidak Terverifikasi</button>
                    <button onClick={()=>this.verified(user.id)} className="btn btn-handle" >Verifikasi </button>
                    </>
                    : <>
                      <button onClick={()=>this.unverified(user.id)} className="btn btn-danger">Tidak Terverifikasi</button>
                      <button onClick={()=>this.verified(user.id)} className="btn btn-handle" >Verifikasi </button>
                      </>
                }
              </td>
            </tr>)
          : <div> Loading ...</div>
          }
        </tbody>
        </table>
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
export default connect(mapStateToProps, null)(VerifikasiAkun);

