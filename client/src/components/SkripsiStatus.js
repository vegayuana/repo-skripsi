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
        Authorization: this.props.token
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
      <div className='status-skripsi'>
        <b>Skripsi</b>
        <hr/>
        {offline? <p>Anda sedang offline. Cek koneksi anda dan refresh </p> 
          : !isLoaded? <div className="spin-box"><Spinner animation="border" variant="secondary"/></div>
          : !skripsi ? <div><h5>Anda Belum Mengunggah Skripsi</h5>
              <Link to='/upload'><button className='btn btn-primary'>Unggah</button></Link>
            </div> 
          : <>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row" className="td-status"><h5>Judul</h5></th>
                <td><p>{skripsi.title}</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>Abstrak</h5></th>
                <td><p className='abs'>{skripsi.abstrak}</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>Abstract</h5></th>
                <td><p className='abs'>{skripsi.abstract}</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>Tahun</h5></th>
                <td><p>{skripsi.published_year}</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>File</h5></th>
                <td>
                  <a href={'https://repositori-skripsi.herokuapp.com/'+skripsi.file_url} alt="skripsi" target='_blank' rel='noreferrer noopener'><FaFilePdf/></a>
                </td>
              </tr>
              <tr>
                <th scope="row"><h5>Bidang Minat</h5></th>
                <td><p>{skripsi.category===1? <>Artificial Intelligence</> : skripsi.category===2? <>Sistem Informasi</> : skripsi.category===3? <>Jaringan Komputer</> : <>-</>}</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>Kata Kunci</h5></th>
                <td>  <p>{skripsi.keywords? <>{skripsi.keywords}</> : <>-</> }</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>Waktu Unggah</h5></th>
                <td> <p>{moment(skripsi.uploaded_at).format("YYYY-MM-D H:mm:ss")}</p></td>
              </tr>
              <tr>
                <th scope="row"><h5>Status</h5></th>
                <td>
                  {skripsi.is_approved===1 ? <div className='icon-check'><FaRegCheckCircle/> Dipublikasikan</div> :
                  skripsi.is_approved===0 ? <div className='icon-check text-danger'><IoMdCloseCircleOutline/> Ditolak</div>: <p>Belum Ditinjau</p>}
                </td>
              </tr>
            {skripsi.is_approved===2 ? <></> : 
              <tr>
                <th scope="row">{skripsi.is_approved===1 ? <h5>Waktu Dipublikasikan</h5> : <h5>Waktu Diproses</h5> }</th>
                <td><p>{moment(skripsi.processed_at).format("YYYY-MM-D H:mm:ss")}</p></td>
              </tr>
            }
            </tbody>
          </table>
          {skripsi.is_approved===1? <></> : <Link to='/reupload'><button className="btn btn-primary">Edit Unggahan</button></Link>}
          </>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token: state.auth.token
  }
}
export default connect(mapStateToProps, null)(SkripsiStatus)