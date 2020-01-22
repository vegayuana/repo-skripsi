import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner, Table, Breadcrumb} from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

export class SkripsiVerification extends Component {
  state ={
    skripsiColl: [],
    isLoaded: false,
  }
  getData= ()=>{
    axios({
      method: 'get',
      url: '/admin/show-skripsi',
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
      url: `/admin/unapproved/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    })
    this.getData()
  }
  approved = (id) => {
    axios({
      method: 'put',
      url: `/admin/approved/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    })
    this.getData()
  }  
  render() {
    let { isLoaded, skripsiColl} = this.state
    if (!this.props.token || this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Breadcrumb.Item active> / Verifikasi Skripsi</Breadcrumb.Item>
        </Breadcrumb>
        <div className="table-box">
          <div className="line"></div> 
          <div className="title">Data Skripsi</div>
          <Table responsive striped bordered size="sm">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col" className="td-lg">Judul</th>
                <th scope="col" className="td-lg">Penulis</th>
                {/* <th scope="col" className="td-md">Kategori</th> */}
                <th scope="col" className="td-sm">Tahun</th>
                <th scope="col" className="td-lg">Abstract</th>
                <th scope="col" className="td-sm">File</th>
                <th scope="col" className="td-md">Status</th>
                <th scope="col" className="td-md">Waktu Upload</th>
                <th scope="col" className="td-lg">Handle</th>
              </tr>
            </thead>
            <tbody>
            { !isLoaded ? <tr><td colSpan="10" className="text-center"><Spinner animation="border" variant="secondary" /></td></tr>
              :
              skripsiColl ===undefined || skripsiColl ===[] ? <tr><td colSpan="10" className="text-center">No Data</td></tr> 
              :
              skripsiColl.map((skripsi, i) => 
                <tr key={i}>
                  <th scope="row">{i+1}</th>
                  <td>{skripsi.title}</td>
                  <td>{skripsi.name}</td>
                  {/* <td>{skripsi.category}</td> */}
                  <td>{skripsi.published_year}</td>
                  <td><div style={{height:'200px', overflowY:'scroll'}}>{skripsi.abstract}</div></td>
                  <td>
                    {/* {skripsi.file_url} */}
                    </td>
                  <td>{ skripsi.is_approved === 1 ? <>Dipublikasikan</> : 
                          skripsi.is_approved === 0 ? <>Ditolak</> :
                            <>Perlu Ditinjau</>
                        }</td>
                  <td>{skripsi.created_at}</td>
                  <td>
                    <button onClick={()=>this.unapproved(skripsi.id)} className={ skripsi.is_approved === 0? "btn-table" : "btn-table btn-danger" }  disabled={ skripsi.is_approved === 0? true : false}>Tolak</button>
                    <button onClick={()=>this.approved(skripsi.id)} className={ skripsi.is_approved === 1? "btn-table": "btn-table btn-handle"} disabled={ skripsi.is_approved === 1? true : false}>Publikasikan</button>
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
    token: state.auth.token,
    role: state.auth.role
  }
}
export default connect(mapStateToProps, null)(SkripsiVerification)
