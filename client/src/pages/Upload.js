import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { scrollToTop } from '../helpers/autoScroll'
import { Spinner } from 'react-bootstrap'

export class Upload extends Component {
  initialState={
    datas:{},
    file:null,
    fileType:'application/pdf',
    message: '', 
    status:'',
    skripsi:{},
    isLoaded:false,
    title:'',
    year:'',
    abstract:''
  }
  state=this.initialState
  submit = (e) =>{
    e.preventDefault();
    let title = this.refs.title.value;
    let year = this.refs.year.value;
    let abstract = this.refs.abstract.value;
    let {file} = this.state

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('year', year)
    formData.append('abstract', abstract)  
    axios({
      method: "POST",
      url: `/user/upload/`,
      data: formData,
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization': this.props.token
      }
    }).then((res) =>{
      this.setState({
        message:res.data.message,
        status:res.data.status,
      })
      this.refs.registerForm.reset();
    }).catch((err) => { 
      this.setState({
        message:err.response.data.message,
        status:err.response.data.status,
      })
    })
  }
  handleInput = (e) =>{
    this.setState({
      [e.target.id] : e.target.value,
    })
  }
  handleFile=(e)=>{
    this.setState({
      file:e.target.files[0],
      fileType: e.target.files[0].type
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
      console.log(err.response)
    })
  }
  componentDidMount(){
    this.checkSkripsi()
    scrollToTop()
  }
  render() {
    console.log(this.state.file)
    let { message, status, isLoaded, skripsi, fileType} = this.state
    if (!localStorage.getItem('token')){
      return <Redirect to={'/'} />
    }
    console.log(skripsi)
    return (
      <>
      {!isLoaded? <Spinner animation="border" variant="secondary" /> :
      <div className="row no-margin">
        <div className="upload-box">
          <h3>Unggah</h3>
          {skripsi ? <><hr/><div><h5>Anda sudah mengunggah skripsi</h5></div></> :
          <form >
            <div className="form-group">
              <label>Judul </label>
                <input type="text" ref="title" id="title" className="form-control" placeholder="Input Judul"/>
              </div>
            <div className="form-group">
              <label>Tahun</label>
              <input type="text" ref="year" id="year" className="form-control" placeholder="Input Tahun"/>
            </div>
            <div className="form-group">
            <label>Abstrak</label>
              <textarea ref="abstract" id="abstract" className="form-control" placeholder="Input Abstrak"/>
            </div>
            <div className="form-group">
              <label>File (Maks 50mb)</label>
              <input type="file" ref="file" onChange={this.handleFile} className="form-control-file" id="file" accept=".pdf"/>
              { fileType==="application/pdf"? <></> :
                <div className="alert alert-danger" role="alert">
                  <strong>File must be PDF</strong>
                </div>
              }
            </div> 
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)} disabled={fileType!=="application/pdf"}>Submit</button>
            { message ==='' ? <></> :
                status===200 ?
                  <div className="alert alert-success" role="alert">
                    <strong>{this.state.message}</strong>
                  </div>
                  :
                <div className="alert alert-danger" role="alert">
                  <strong>{this.state.message}</strong>
                </div>
             }
          </form>
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
