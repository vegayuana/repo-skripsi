import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaFileAlt, FaUserCheck } from 'react-icons/fa';

export class Admin extends Component {
  render() {
    return (
      <div className="main-box">
        <div className="row">
          <div className="col-md-4">
            <Link to='/account-verification' className="card">
              <div className="row no-margin">
                  <div className="col-md-4 card-icon"><FaUserCheck className="icon"/></div>
                  <div className="col-md-8 card-text"><p>Verifikasi Akun</p></div>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to='/skripsi-verification' className="card">
              <div className="row">
                <div className="col-md-4 card-icon"><FaFileAlt className="icon"/></div>
                <div className="col-md-8 card-text"><p>Verifikasi Skripsi</p></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin
