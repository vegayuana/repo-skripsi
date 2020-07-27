import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import { FaCheck, FaFilePdf, FaTimes } from 'react-icons/fa'
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
    }).catch(()=>{
      this.setState({
        offline:true,
      })
    })
  }
  componentDidMount(){
    this.getSkripsi()
  }
  render() {
    let { isLoaded, offline, skripsi} = this.state
    return (
      <div className='status-skripsi'>
        <b>Skripsi</b>
        <hr/>
        {offline? <p>Anda sedang offline. Cek koneksi anda dan refresh </p> 
          : !isLoaded? <div className="spin-box"><Spinner animation="border" variant="secondary"/></div>
          : !skripsi ? <div><p className='status-not'>Anda Belum Mengunggah Skripsi</p>
              <Link to='/upload'><button className='btn btn-primary'>Unggah</button></Link>
            </div> 
          : <>
          <table className="table">
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
                <td><p>{skripsi.category===1 ? <>Sistem Cerdas dan Sistem Grafika (SCSG)</> : 
                        skripsi.category===2 ? <>Sistem Informasi dan Rekayasa Perangkat Lunak (SIRPL)</> : 
                        skripsi.category===3 ? <>Jaringan Komputer dan Komunikasi Data (JKKD)</> : 
                        skripsi.category===4 ? <>Ilmu Komputasi dan Metode Numerik (IKMN)</> 
                        : <>-</> }
                    </p> 
                </td>
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
                  {skripsi.is_approved===1 ?<p className='status status-green'><FaCheck/> Dipublikasikan</p> :
                  skripsi.is_approved===0 ? <p className='status status-red'><FaTimes/> Ditolak</p> : <p className='status status-muted'>Belum Ditinjau</p>}
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