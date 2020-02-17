import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { scrollToTop } from '../helpers/autoScroll'
import { Spinner, Modal } from 'react-bootstrap'

export class Upload extends Component {
  initialState={
    skripsi:{},
    isLoaded:false,
    offline: false,
    showLoading:false,
    title:'',
    titleAlert:'initial',
    year:'',
    yearAlert:'initial',
    abstract:'',
    abstractAlert:'initial',
    category:'',
    keywords:'',
    file:null,
    message: '', 
    status:'',
  }
  state=this.initialState
  submit = (e) =>{
    e.preventDefault()
    this.setState({
      showLoading:true
    })
    console.log(this.state)
    let {title, year, abstract, category, keywords} = this.state
    let {file} = this.state
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('year', year)
    formData.append('abstract', abstract)
    formData.append('category', category)  
    formData.append('keywords', keywords)  
    axios({
      method: 'POST',
      url: `/user/upload/`,
      data: formData,
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization': this.props.token
      }
    }).then((res) =>{
      this.refs.uploadForm.reset()
      this.setState({
        message:res.data.message,
        status:res.data.status,
        showLoading:false
      })
    }).catch((err) => { 
      this.setState({
        showLoading:false
      })
      if( err.response){
        this.setState({
          message:err.response.data.message,
          status:err.response.data.status,
        })
      }
    })
  }
  handleInput = (e) =>{
    console.log(e.target.id)
    console.log(e.target.value)
    if(e.target.id==='title'){
      e.target.value=e.target.value.replace(/\n/g, ' ')
    }
    this.setState({
      [e.target.id] : e.target.value,
    })
    if (e.target.id==='title'){
      this.setState({
        titleAlert: e.target.value,
      })
    }
    if (e.target.id==='year'){
      this.setState({
        yearAlert: e.target.value,
      })
    }
    if (e.target.id==='abstract'){
      this.setState({
        abstractAlert: e.target.value,
      })
    }
  }
  handleFile=(e)=>{
    this.setState({
      file:e.target.files[0],
    })
  }
  checkSkripsi=()=>{
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
    }).catch((err) => { 
      if(err.response){
        console.log(err.response)
      }
    })
  }
  componentDidMount(){
    scrollToTop()
    if (navigator.onLine){
      this.checkSkripsi()
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
    let { message, status, isLoaded, offline, skripsi, file, title, year, abstract, titleAlert, yearAlert, abstractAlert, keywords} = this.state
    if (!localStorage.getItem('token')){
      return <Redirect to={'/'} />
    }
    return (
      <>
      <div className="row no-margin">
        <div className="upload-box">
          <h3>Unggah</h3>
          {offline? <p>Anda sedang offline. Cek koneksi anda dan refresh </p> 
            : !isLoaded? <Spinner animation="border" variant="secondary" /> 
            : skripsi ? <><hr/><div className="text-middle"><h5>Anda sudah mengunggah skripsi</h5><p>Cek status skripsi di menu profil</p></div></> :
          <>
          <form ref="uploadForm">
            {status === 200?       
              <>     
              <div className="alert alert-success" role="alert">
                <strong>{this.state.message}</strong>
              </div> 
              <Link to='/'><button className="btn btn-primary">Selesai</button></Link>
              </> :
              <>
              <div className="form-group">
                <label>Judul *</label>
                <textarea type="text" id="title" maxLength="255" onBlur={this.handleInput} className="form-control" placeholder="Judul Skripsi"/>
                { titleAlert==='initial'? <></> : !titleAlert ?
                  <div className="alert alert-danger" role="alert">
                    <strong>Judul tidak boleh kosong</strong>
                  </div> : <></>
                }
              </div>
              <div className="form-group">
                <label>Tahun *</label>
                <input type="number" id="year" onBlur={this.handleInput} className="form-control" placeholder="Tahun Publikasi Skripsi"/>
                { yearAlert==='initial'? <></> : year.length!==4 || year<2000 || year>2100 ?
                  <div className="alert alert-danger" role="alert">
                    <strong>Tahun harus diisi dengan benar</strong>
                  </div> : <></>
                }
              </div>
              <div className="form-group">
                <label>Abstrak *</label>
                <textarea id="abstract" onBlur={this.handleInput} className="form-control" placeholder="Input Abstrak"/>
                { abstractAlert==='initial'? <></> : !abstractAlert ?
                  <div className="alert alert-danger" role="alert">
                    <strong>Abstrak tidak boleh kosong</strong>
                  </div> : <></>
                }
              </div>
              <div className="form-group">
                <label>File * (Maks 20mb)</label>
                <input type="file" ref="file" onChange={this.handleFile} className="form-control-file" id="file" accept=".pdf"/>
                { !file ? <></> : file.type==="application/pdf" ? <></> :
                  <div className="alert alert-danger" role="alert">
                    <strong>File must be PDF</strong>
                  </div> 
                }
              </div> 
              <div className="form-group">
                <label>Bidang Minat Skripsi</label>
                <select className="custom-select" onChange={this.handleInput} id="category">
                  <option value=''>Bidang Minat</option>
                  <option value='1'>Artificial Intelligence</option>
                  <option value='2'>Sistem Informasi</option>
                  <option value='3'>Jaringan Komputer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kata Kunci </label>
                <p style={{fontSize: '0.8rem'}}>Input 1-5 kata kunci yang berkaitan dengan skripsi (pisahkan dengan koma)</p>
                <input type="text" id="keywords" onChange={this.handleInput} className="form-control" placeholder="Kata Kunci"/>
                { keywords.length<255 ? <></> : 
                  <div className="alert alert-danger" role="alert">
                    <strong>Kata kunci terlalu banyak</strong>
                  </div> 
                }
              </div>
              <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)} disabled={!title || !abstract || year.length!==4 || year<2000 || year>2100 || !file || !file.type==="application/pdf" || keywords.length>=255}>Submit</button>
              { message ==='' ? <></> : 
                <div className="alert alert-danger" role="alert">
                  <strong>{this.state.message}</strong>
                </div>
              }
              </>
            }
          </form>
          <Modal show={this.state.showLoading} centered>
            <Modal.Body className='modal-box'>
              Sedang diproses ...
            </Modal.Body>
          </Modal>
          </>
          }
        </div>
      </div>
      }
      </>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
    role: state.auth.role
  }
}
export default connect(mapStateToProps, null)(Upload)