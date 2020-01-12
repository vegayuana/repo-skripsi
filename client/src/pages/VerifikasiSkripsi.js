import React, { Component } from 'react'

export class VerifikasiSkripsi extends Component {

  delete = (i) => {
    let users = this.state.users;
    users.splice(i,1);
    this.setState({
      users: users
    });
  }

  update = (i) => {
    let user = this.state.users[i];
    user.status='Terverifikasi'
    this.forceUpdate()
    console.log(this.state.users)
  }  

  render() {
    return (
      <div className="container">
        <div>
        <h5>Data Skripsi</h5>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Depan</th>
            <th scope="col">Nama Belakang</th>
            <th scope="col">NPM</th>
            <th scope="col">KTM</th>
            <th scope="col">Status</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, i) =>
            <tr key={i}>
              <th scope="row">{user.no}</th>
              <td>{user.namaD}</td>
              <td>{user.namaB}</td>
              <td>{user.npm}</td>
              <td>{user.ktm}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={()=>this.delete(i)} className="btn btn-danger">Hapus</button>
                <button onClick={()=>this.update(i)} className="btn btn-handle">Verifikasi </button>
              </td>
            </tr>
          )
          }
        </tbody>
        </table>
      </div>
      </div>
    )
  }
}

export default VerifikasiSkripsi
