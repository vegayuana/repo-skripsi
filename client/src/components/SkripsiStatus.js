import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Spinner} from 'react-bootstrap'
import { FaRegCheckCircle } from 'react-icons/fa'
import { IoMdCloseCircleOutline } from 'react-icons/io';

export class SkripsiStatus extends Component {
  state={
    skripsi:{},
    isLoaded:false
  }
  getSkripsi=()=>{
    axios({
      method: 'get',
      url: `http://localhost:3000/user/skripsi/`,
      headers: {
        Authorization: this.props.token
      } 
    })
    .then(res=>{
      this.setState({ 
        skripsi: res.data,
        isLoaded: true
      })
    })
  }
  componentDidMount(){
    this.getSkripsi()
  }
  render() {
    console.log(this.props.token)
    let { isLoaded, skripsi} = this.state
    return (
      <div>
        <h5>Skripsi</h5>
        <hr/>
        {!isLoaded? <Spinner animation="border" variant="secondary" />: 
        <>
        <p>{skripsi.title}</p>
        {skripsi.is_approved===1 ? <div className='icon-check'><FaRegCheckCircle/> Dipublikasikan</div> :
         skripsi.is_approved===0 ? <div className='icon-check text-danger'><IoMdCloseCircleOutline/> Ditolak</div>: <>Belum Ditinjau</>}
        <div>{skripsi.abstract}</div>
        <div>{skripsi.file_url}</div>
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
