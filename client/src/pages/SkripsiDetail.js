import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
export class SkripsiDetail extends Component {
  state={
    skripsi:[], 
    isLoaded:false
  }
  getData =()=>{
    let id = this.props.match.params.id
    axios({
      method: 'get',
      url: `http://localhost:3000/skripsi/detail/${id}`,
      headers: {
        Authorization: this.props.token
      } 
    })
    .then(res=>{
      this.setState({ 
        skripsi: res.data[0],
        isLoaded: true
      })
    })
    .catch(err=>{
      console.log(err.response)
    })
  }
  componentDidMount(){
    this.getData()
  }
  render() {
    let { isLoaded, skripsi } = this.state
    if (!this.props.token){
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
              <h4>IDENTITAS</h4>
              <hr/>
              <h5>Judul</h5>
              <p>{skripsi.title}</p>
              <h5>Pengarang</h5>
              <p>{skripsi.name}</p>
              <h5>Tahun</h5>
              <p>{skripsi.published_year}</p>
              {/* <h5>Kategori</h5>
              <p>{skripsi.category}</p> */}
              </>}
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="line" style={{backgroundColor: '#05386B'}}></div>
            <div className="detail-box abstrak">
              {!isLoaded ? <Spinner animation="border" variant="secondary" /> :
              <>
              <h4>ABSTRAK</h4>
              <hr/>
              <p>{skripsi.abstract}</p>
              </>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="line" style={{marginTop:'1rem', backgroundColor:'#5cdb95'}}></div>
            <div className="file-box">
              <h5>FILE</h5>
              <hr/>
              <p>{skripsi.file_url}</p>
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
