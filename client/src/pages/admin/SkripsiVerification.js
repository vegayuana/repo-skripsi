import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner, Table, Breadcrumb} from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import { FaFilePdf, FaCheck, FaTimes} from 'react-icons/fa'

export class SkripsiVerification extends Component {
  state ={
    skripsi: [],
    isLoaded: false,
  }
  getData= ()=>{
    axios({
      method: 'get',
      url: '/admin/show-skripsi',
      headers: {
        Authorization: this.props.token
      } 
    }).then(res=>{
      this.setState({ 
        skripsi: res.data,
        isLoaded: true
      })
    }).catch((err) => { 
      console.log(err.response.statusText)
    })
  }
  componentDidMount(){
    this.getData()
    scrollToTop()
  }
  unapproved = (id) => {
    axios({
      method: 'put',
      url: `/admin/unapproved/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    }).catch((err) => { 
      console.log(err.response.statusText)
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
    }).catch((err) => { 
      console.log(err.response.statusText)
    })
    this.getData()
  }  
  render() {
    let { isLoaded, skripsi} = this.state
    if (!localStorage.getItem('token')|| this.props.role==='user'){
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
                <th scope="col" className="td-md">Waktu Unggah</th>
                <th scope="col" className="td-md">Waktu Diproses</th>
                <th scope="col" className="td-lg">Handle</th>
              </tr>
            </thead>
            <tbody>
            { !isLoaded ? <tr><td colSpan="10" className="text-center"><Spinner animation="border" variant="secondary" /></td></tr>
              : !skripsi ? <tr><td colSpan="10" className="text-center">No Data</td></tr> 
                : skripsi.map((item, i) => 
                <tr key={i}>
                  <th scope="row">{i+1}</th>
                  <td>{item.title}</td>
                  <td>{item.name}</td>
                  <td>{item.published_year}</td>
                  <td><div style={{height:'200px', overflowY:'scroll'}}>{item.abstract}</div></td>
                  <td>
                    <a href={'http://localhost:5000/'+item.file_url} target='_blank'><FaFilePdf className='icons'/>click</a>
                  </td>
                  <td>{ item.is_approved === 1 ? <div style={{color:'#379683'}}><FaCheck/> Dipublikasikan</div> : 
                          item.is_approved === 0 ? <div className='text-danger'><FaTimes/> Ditolak</div> :
                            <>Perlu Ditinjau</>
                        }</td>
                  <td><p>{item.uploaded_at.split('T')[0]} {item.uploaded_at.split('T')[1].split('.000Z')}</p></td>
                  <td>{item.is_approved===2 ? <></> : <p>{item.processed_at.split('T')[0]} {item.processed_at.split('T')[1].split('.000Z')}</p>}</td>
                  <td>
                    <button onClick={()=>this.unapproved(item.id)} className={ item.is_approved === 0? "btn-table" : "btn-table btn-danger" }  disabled={ item.is_approved === 0? true : false}>Tolak</button>
                    <button onClick={()=>this.approved(item.id)} className={ item.is_approved === 1? "btn-table": "btn-table btn-handle"} disabled={ item.is_approved === 1? true : false}>Publikasikan</button>
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
