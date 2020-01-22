import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

export class Upload extends Component {
  state={
    datas:{},
    file:null
  }
  // submit = (e) =>{
  //   e.preventDefault();
  //   let {name, npm, pass, file}= this.state
  //   const formData = new FormData()
  //   formData.append('ktm', file)
  //   formData.append('name', name)
  //   formData.append('npm', npm)
  //   formData.append('password', pass)
  //   axios({
  //     method: "POST",
  //     url: "/register",
  //     data: formData,
  //     headers:{
  //       'Content-Type':'multipart/form-data'
  //     }
  //   }).then((res) =>{
  //     this.setState(this.initialState)
  //     this.setState({
  //       message:res.data.message,
  //       status:res.data.status,
  //     })
  //     this.refs.registerForm.reset();
  //   })
  //   .catch((err) => { 
  //     this.setState({
  //       message:err.response.data.message,
  //       status:err.response.data.status,
  //     })
  //   })
  // }
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
      url: `/user/upload/${this.props.token}`,
      data: formData,
      headers:{
        'Content-Type':'multipart/form-data',
      }
    }).then((res) =>{

    })


  }
  handleFile=(e)=>{
    this.setState({
      file:e.target.files[0]
    })
  }
  render() {
    console.log('ini file', this.props.token)
    return (
      <div>
      <div className="row no-margin">
        <div className="register-box">
          <h3>Unggah</h3>
          <form >
            <div className="form-group">
              <label>Judul </label>
                <input type="text" ref="title" className="form-control" id="title" placeholder="Input Judul"/>
              </div>
{/*             
            <div className="form-group">
              <label>Subjek</label>
              <input type="text" ref="subjek" className="form-control" id="idsubjek" placeholder="Input Subjek"/>
            </div> */}
            <div className="form-group">
              <label>Tahun</label>
              <input type="text" ref="year" className="form-control" id="year" placeholder="Input Tahun"/>
            </div>
            <div className="form-group">
            <label>Abstrak</label>
              <textarea ref="abstract" className="form-control" id="abstract" placeholder="Input Abstrak"/>
            </div>
            <div className="form-group">
              <label>File</label>
              <input type="file" ref="file" onChange={this.handleFile} className="form-control-file" id="file" accept=".pdf"/>
            </div> 
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)}>Submit</button>
          </form>
        </div>
        <div className="col-xl-3"></div>
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
export default connect(mapStateToProps, null)(Upload)
