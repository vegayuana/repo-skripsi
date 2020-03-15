import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import {scrollToTop} from '../helpers/autoScroll'
import axios from 'axios'
import Forum from '../components/Forum'

class UserForum extends Component {
  state={
    text:'',
    dataLoaded:false,
    isLoading:false,
    chats:[],
    offline:false,
    message:''
  }
  handleText = e =>{
    this.setState({
      [e.target.id] : e.target.value.trim()
    })
  }
  submit = e => {
    let {text} =this.state
    e.preventDefault()
    if(text){
      this.setState({
        isLoading:true
      })
      axios({
        method: 'post',
        url: '/user/insert-text',
        headers: {
          Authorization:this.props.token
        },
        data: {
          text: text,
        }
      }).then(res => {
        this.setState({
          isLoading:false,
          text:''
        })
        this.getForum()
        this.refs.messages.reset()
      }).catch(err=>{
        console.log(err.response)
        if(err.response){
          this.setState({
            message:err.response.data.message
          })
        }
        this.setState({
          isLoading:false,
        })
        setTimeout(() => 
          this.setState({
            message:''
        }), 5000)
      })
    }
  }
  getForum= ()=>{
    axios({
      method: 'get',
      url: '/user/forum',
      headers: {
        Authorization:this.props.token
      } 
    }).then(res=>{
      console.log(res)
      this.setState({ 
        dataLoaded:true,
        chats:res.data
      })
    }).catch((err) => { 
      if(err.response){
        console.log(err.response.statusText)
      }
      this.setState({
        dataLoaded:true
      })
    })
  }
  componentDidMount(){
    scrollToTop()
    if (navigator.onLine){
      this.getForum()
      this.setState({
        offline:false
      })
    }
    else{
      this.setState({
        offline:true,
      })
    }
  }
  render() {
    let {isLoading, dataLoaded, chats, offline, message } = this.state
    if (!this.props.token || this.props.role==='admin'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <h4 className='forum-title'>Kontak Admin</h4>
        <div className="forum-box">
          <Forum dataLoaded={dataLoaded} chats={chats} message={message }offline={offline}/>
          <form ref='messages' autoComplete='off'>
          <div className="input-group forum">
            <textarea type="text" className="form-control" style={{height:'50px'}} id='text' onBlur={e => this.handleText(e)} placeholder="Pertanyaan" aria-label="pertanyaan" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              {isLoading? <button className="btn btn-primary" type="button" disabled={true}><Spinner animation="border" className="spin-green"/></button>:
              <button className="btn btn-primary" type="button" onClick={e => this.submit(e)}>Kirim</button>
              }
            </div>
          </div>
          </form>
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
export default connect(mapStateToProps, null)(UserForum)