import React, { Component } from 'react'
import {Spinner} from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'

export class ProfileInfo extends Component {
  state={
    user:{},
    isLoaded:false,
    newPass:'',
    oldPass:'',
    message:'',
    status:null
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
  submit=(e)=>{
    e.preventDefault();
    console.log(this.state)
    axios({
      method: 'put',
      url: `http://localhost:3000/user/edit-pass`,
      headers:{
        Authorization: this.props.token
      },
      data: {
        newPass:this.state.newPass,
        oldPass:this.state.oldPass
      }
    }).then(res => {
      this.setState({
        message:res.data.message,
        status:res.data.status,
      })
    }).catch((err) => { 
      this.setState({
        message:err.response.data.message,
        status:err.response.data.status,
      })
    })
  }
  handleInput = (e) =>{
    this.setState({
       [e.target.id]: e.target.value,
    })
  }
  render() {
    let { user, isLoaded } = this.state
    return (
      <div>
        {!isLoaded ? <Spinner animation="border" variant="secondary" /> :
        <>
        <p>{user.name}</p>
        <p>{user.npm}</p>
        <p>KTM</p>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit Password</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                <div className="form-group">
                  <label>Password Lama</label>
                  <input type="password" id="oldPass" className="form-control" placeholder="Password" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                  <label>Password Baru</label>
                  <input type="password" id="newPass" className="form-control" placeholder="Password" onChange={this.handleInput}/>
                </div>
                {this.state.status===400? 
                    <div className="alert alert-danger" role="alert">
                      <strong>{this.state.message}</strong>
                    </div>
                  :this.state.status===200? 
                    <div className="alert alert-success" role="alert">
                      <strong>{this.state.message}</strong> Please Log In
                    </div>
                  :<></>
                }
                <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.submit}>Save changes</button>
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
