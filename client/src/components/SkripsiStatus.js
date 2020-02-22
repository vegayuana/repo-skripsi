import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Spinner} from 'react-bootstrap'
import { FaRegCheckCircle, FaFilePdf } from 'react-icons/fa'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import moment from 'moment'

export class SkripsiStatus extends Component {
  state={
    skripsi:{},
    isLoaded:false,
    Offline:false
  }
  getSkripsi=()=>{
    axios({
      method: 'get',
      url: `/user/skripsi/`,
      headers: {
        Authorization: localStorage.getItem('token')
      } 
    }).then(res=>{
      this.setState({ 
        skripsi: res.data,
        isLoaded: true
      })
    }).catch(err=>{
      if(err.response){
      console.log(err.response)
      }
    })
  }
  componentDidMount(){
    if (navigator.onLine){
      this.getSkripsi()
      this.setState({
        offline:false
      })
    }
    else{
      this.setState({
        offline:true,
      })
    }
  }
  render() {
    let { isLoaded, offline, skripsi} = this.state
    return (
      <div>
        <h5>Skripsi</h5>
        <hr/>
        {offline? <p>Anda sedang offline. Cek koneksi anda dan refresh </p> 
          : !isLoaded? <Spinner animation="border" variant="secondary" /> 
          : !skripsi ? <div><h5>Anda Belum Mengunggah Skripsi</h5></div> 
          : <>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Judul</h5>
            </div>
            <div className="col-7 col-md-9">
              <p>{skripsi.title}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Abstrak</h5>
            </div>
            <div className="col-7 col-md-9 abs">
              <p>{skripsi.abstract}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Tahun</h5>
            </div>
            <div className="col-7 col-md-9">
              <p>{skripsi.published_year}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>File</h5>
            </div>
            <div className="col-7 col-md-9">
              <a href={'http://localhost:5000/'+skripsi.file_url} alt="skripsi" target='_blank' rel='noreferrer noopener'><FaFilePdf/></a>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Bidang Minat </h5>
            </div>
            <div className="col-7 col-md-9">
              <p>{skripsi.category===1? <>Artificial Intelligence</> : skripsi.category===2? <>Sistem Informasi</> : skripsi.category===3? <>Jaringan Komputer</> : <>-</>}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Kata Kunci</h5>
            </div>
            <div className="col-7 col-md-9">
              <p>{skripsi.keywords? <>{skripsi.keywords}</> : <>-</> }</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Waktu Unggah</h5>
            </div>
            <div className="col-7 col-md-9">
              <p>{moment(skripsi.uploaded_at).format("YYYY-MM-D H:mm:ss")}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-md-3">
              <h5>Status</h5>
            </div>
            <div className="col-7 col-md-9">
              {skripsi.is_approved===1 ? <div className='icon-check'><FaRegCheckCircle/> Dipublikasikan</div> :
                skripsi.is_approved===0 ? <div className='icon-check text-danger'><IoMdCloseCircleOutline/> Ditolak</div>: <>Belum Ditinjau</>}
            </div>
          </div>
          {skripsi.is_approved===2 ? <></> : 
            <div className="row">
              <div className="col-5 col-md-3">
              { skripsi.is_approved===1 ? <h5>Waktu Dipublikasikan</h5> : <h5>Waktu Diproses</h5> }
              </div>
              <div className="col-7 col-md-9">
                <p>{moment(skripsi.processed_at).format("YYYY-MM-D H:mm:ss")}</p>
              </div>
            </div>
          }
          {skripsi.is_approved===1? <></> : <Link to='/reupload'><button className="btn btn-primary">Edit Unggahan</button></Link>}
          </>
        }
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
export default connect(mapStateToProps, null)(SkripsiStatus)