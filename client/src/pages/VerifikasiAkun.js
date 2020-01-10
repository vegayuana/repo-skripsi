import React, { Component } from 'react'

export class VerifikasiAkun extends Component {
  state ={
    users: [],
    isLoaded: true,
    update:false,
  }

  componentDidMount(){
    fetch('http://localhost:3000/user/show')
    .then(res => res.json())
    .then(json => {
      this.setState({ 
        users: json,
        isLoaded: true
      })
    })
  }

  delete = (id) => {
    fetch(`http://localhost:3000/user/delete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      this.forceUpdate()
    })
  }

  update = (id) => {
    fetch(`http://localhost:3000/user/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(
      this.forceUpdate()
    )
  }  

  render() {
    let { isLoaded, users} = this.state
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
              <td>{user.is_active}</td>
              <td>
                <button onClick={()=>this.delete(user.id)} className="btn btn-danger">Tidak Terverifikasi</button>
                <button onClick={()=>this.update(user.id)} className="btn btn-handle">Verifikasi </button>
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

export default VerifikasiAkun
