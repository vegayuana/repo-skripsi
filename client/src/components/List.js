import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Skripsi from './Skripsi'
export class List extends Component {
  state={
    isLoaded: false,
    skripsiColl:[], 
  }
  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/skripsi/list',
      Headers: {
      }
    })
    .then(res=>{
      this.setState({ 
        skripsiColl: res.data,
        isLoaded: true
      })
    })
  }
  render() {
    let { isLoaded, skripsiColl} = this.state
    let { token } = this.props
    return (
      <>
      { !isLoaded ? 
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>  
        : 
        skripsiColl.map((skripsi, i) =>
          !token ? 
          <Skripsi skripsi={skripsi} key={i}></Skripsi>
          : 
          <Link to={'/skripsi-detail/'+skripsi.id} key={i}>
            <Skripsi skripsi={skripsi}></Skripsi>
          </Link>
        )
      }
      </>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token
  }
}
export default connect(mapStateToProps, null)(List)