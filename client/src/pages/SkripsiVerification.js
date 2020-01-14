import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export class SkripsiVerification extends Component {
  state ={
    skripsiColl: [],
    isLoaded: false,
  }

  getData= ()=>{
    axios({
      method: 'get',
      url: 'http://localhost:3000/admin/show-skripsi',
      headers: {
        Authorization: this.props.token
      } 
    })
    .then(res=>{
      this.setState({ 
        skripsiColl: res.data,
        isLoaded: true
      })
    })
  }

  componentDidMount(){
    this.getData()
  }

  unapproved = (id) => {
    axios({
      method: 'put',
      url: `http://localhost:3000/admin/unapproved/${id}`,
    })
    this.getData()
  }

  approved = (id) => {
    axios({
      method: 'put',
      url: `http://localhost:3000/admin/approved/${id}`,
    })
    this.getData()
  }  
  render() {
    let { isLoaded, skripsiColl, empty} = this.state
    // if (!this.props.token){
    //   return <Redirect to={'/'} />
    // }
    return (
      <div className="main-box">
        <div>
        <h5>Data Skripsi</h5>
      <Table responsive striped size="sm">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Judul</th>
            <th scope="col">Penulis</th>
            <th scope="col">Kategori</th>
            <th scope="col">Tahun</th>
            <th scope="col">Abstract</th>
            <th scope="col">File</th>
            <th scope="col">Status</th>
            <th scope="col">Waktu Upload</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
        { !isLoaded ? <td colspan="10" className="text-center"><Spinner animation="border"  variant="secondary" /></td> 
          :
          skripsiColl ===undefined || skripsiColl ===[] ? <td colspan="10" className="text-center">No Data</td> 
          :
          skripsiColl.map((skripsi, i) => 
            <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>{skripsi.title}</td>
              <td>{skripsi.name}</td>
              <td>{skripsi.category}</td>
              <td>{skripsi.published_year}</td>
              <td>{skripsi.abstract}</td>
              <td>{skripsi.file_url}</td>
              <td>{ skripsi.is_approved === 1 ? <>Dipublikasikan</> : 
                      skripsi.is_approved === 0 ? <>Ditolak</> :
                        <>Perlu Ditinjau</>
                    }</td>
              <td>{skripsi.created_at}</td>
              <td>
              {skripsi.is_approved === 1 ?
                  <>
                  <button onClick={()=>this.unapproved(skripsi.id)} className="btn-table btn-danger" >Tolak</button>
                  <button onClick={()=>this.approved(skripsi.id)} className="btn-table btn-handle" disabled>Publikasikan</button>
                  </>
                  : skripsi.is_approved === 0 ?
                    <>
                    <button onClick={()=>this.unapproved(skripsi.id)} className="btn-table btn-danger" disabled>Tolak</button>
                    <button onClick={()=>this.approved(skripsi.id)} className="btn-table btn-handle" >Publikasikan</button>
                    </>
                    : <>
                      <button onClick={()=>this.unapproved(skripsi.id)} className="btn-table btn-danger">Tolak</button>
                      <button onClick={()=>this.approved(skripsi.id)} className="btn-table btn-handle">Publikasikan</button>
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
}
export default connect(mapStateToProps, null)(SkripsiVerification)
