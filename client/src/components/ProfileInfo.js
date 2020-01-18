import React, { Component } from 'react'
import {Spinner} from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'

export class ProfileInfo extends Component {
  state={
    user:{},
    isLoaded:false
  }
  getProfile= ()=>{
    axios({
      method: 'get',
      url: `http://localhost:3000/user/profile/`,
      headers: {
        Authorization: this.props.token
      } 
    })
    .then(res=>{
      this.setState({ 
        user: res.data,
        isLoaded: true
      })
    })
  }
  componentDidMount(){
    this.getProfile()
  }
  render() {
    let { user, isLoaded } = this.state
    return (
      <div>
        {!isLoaded ? <Spinner animation="border" variant="secondary" /> :
        <>
        <p>{user.name}</p>
        <p>{user.npm}</p>
        <p>{user.ktm_url}</p>
        <p type="password">{user.password}</p>
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
        </>
        }
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
export default connect(mapStateToProps, null)(ProfileInfo)
