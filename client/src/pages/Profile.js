import React, { Component } from 'react'

export class Profile extends Component {
  
  render() {
    return (
      <div className="">
        <div className="row main-box">
          <div className="col-md-6">
            <div className="profile-box">
            <div className="ribbon"><h2 className="no-margin">Profile</h2></div>
              <p>Nama Lengkap</p>
              <p>NPM</p>
              <p>KTM</p>
              <p>Password</p>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit Password</button>
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit Password</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                      <div className="form-group">
                        <label>Password Lama</label>
                        <input type="password" ref="old-pass" id="old-pass" className="form-control" placeholder="Password"/>
                      </div>
                      <div className="form-group">
                        <label>Password Baru</label>
                        <input type="password" ref="new-pass" id="new-pass" className="form-control" placeholder="Password"/>
                      </div>
                      <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-box">
              <h5>Skripsi</h5>
              <hr/>
              <p>Judul</p>
              <p>Status</p>
              <div>File</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
