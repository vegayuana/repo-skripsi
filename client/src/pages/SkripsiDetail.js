import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {scrollToTop} from '../helpers/autoScroll'
import { FaFilePdf } from 'react-icons/fa'

export class SkripsiDetail extends Component {
  state={
    skripsi:[], 
    isLoaded:false
  }
  getData =()=>{
    let id = this.props.match.params.id
    axios({
      method: 'get',
      url: `/skripsi/detail/`,
      params:{
        id : id
      },
      headers: {
        Authorization: localStorage.getItem('token')
      } 
    }).then(res=>{
      this.setState({ 
        skripsi: res.data[0],
        isLoaded: true
      })
    }).catch(err=>{
      if(err.response){
      console.log(err.response)
      }
    })
  }
  
  componentDidMount(){
    this.getData()
    scrollToTop()
  }
  download=(filePath)=>{
    console.log(filePath)
    axios({
      method: 'get',
      url: `/skripsi/download/`,
      params:{
        filePath: filePath
      },
      responseType: 'blob',
      headers: {
        Authorization: localStorage.getItem('token')
      } 
    }).then(res=>{
      console.log(res.data);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); 
      document.body.appendChild(link);
      link.click();
    }).catch(err=>{
      if(err.response){
      console.log(err.response)
      }
    })
  }
  render() {
    let { isLoaded, skripsi } = this.state
    console.log(skripsi)
    if (!localStorage.getItem('token')){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">      
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="line"></div>
            <div className="detail-box">
              { !isLoaded ? <Spinner animation="border" variant="secondary" /> :
              <>
                { !skripsi ? <>No Data</> :
                  <>
                  <div>
                    <h4>IDENTITAS</h4>
                    <hr/>
                  </div>
                  <h5>Judul</h5>
                  <p>{skripsi.title}</p>
                  <h5>Pengarang</h5>
                  <p>{skripsi.name}</p>
                  <h5>Tahun</h5>
                  <p>{skripsi.published_year}</p>
                  <h5>Kategori</h5>
                  <p>{skripsi.category===1 ? <>Artificial Intelligence</> : skripsi.category===2 ? <>Sistem Informasi</> : skripsi.category===3 ? <>Jaringan Komputer</> : <>-</> }</p>
                  <h5>Kata Kunci</h5>
                  <p>{skripsi.keywords ? skripsi.keywords : <>-</>}</p>
                  </>
                }
              </>
              }
            </div>
          </div>
          <div className="col-12 col-md-8 abstract">
            <div className="line" style={{ backgroundColor: '#8ee4af '}}></div>
            <div className="detail-box">
              {!isLoaded ? <Spinner animation="border" variant="secondary" /> :
              <>
              { !skripsi ? <>No Data</> :
              <>
              <div>
                <h4>ABSTRAK</h4>
                <hr/>
              </div>
              <p>{skripsi.abstract}</p>
              </>
              }
              </>}
            </div>
          </div>
        </div>
        <div className="row file">
          <div className="col-12">
            <div className="line" style={{backgroundColor:'#5cdb95'}}></div>
            <div className="file-box">
              <h5>FILE</h5>
              <hr/>
              { !skripsi ? <>No Data</> :
              <a onClick={()=>this.download(skripsi.file_url)}><FaFilePdf className='icons'/>Download</a>
              }   
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
    role: state.auth.role
  }
}
export default connect(mapStateToProps, null)(SkripsiDetail)