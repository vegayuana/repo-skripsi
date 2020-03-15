import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AdminCard from '../../components/AdminCard'
import {scrollToTop} from '../../helpers/autoScroll'

export class Admin extends Component {
  componentDidMount(){
    scrollToTop()
  }
  render() {
    if (!this.props.token || this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box admin-page">
        <div className="row">
          <div className="col-12 col-md-4">
            <Link to='/account-verification' className="card">
              <AdminCard menu='Verifikasi Akun' icon='Akun'/>
            </Link>
          </div>
          <div className="col-12 col-md-4">
            <Link to='/skripsi-verification' className="card">
              <AdminCard menu='Tinjau Skripsi' icon='Skripsi'/>
            </Link>
          </div>
          <div className="col-12 col-md-4">
            <Link to='/forum-list' className="card">
              <AdminCard menu='Pertanyaan' icon='Pertanyaan'/>
            </Link>
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
export default connect(mapStateToProps, null)(Admin)