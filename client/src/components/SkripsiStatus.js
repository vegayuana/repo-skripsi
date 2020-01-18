import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Spinner} from 'react-bootstrap'

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
        <p>{skripsi.is_approved}</p>
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
