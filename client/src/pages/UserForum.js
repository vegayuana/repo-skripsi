import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import {scrollToTop} from '../helpers/autoScroll'
import {Cookies} from 'react-cookie'
import Forum from '../components/Forum'
const cookie = new Cookies()

export default class UserForum extends Component {
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
      [e.target.id] : e.target.value
    })
  }
  submit = e => {
    let {text} =this.state
    e.preventDefault()
    if(this.state.text){
      this.setState({
        isLoading:true
      })
      axios({
        method: 'post',
        url: '/user/insert-text',
        headers: {
          Authorization:cookie.get('token')
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
        this.refs.message.reset()
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
        Authorization:cookie.get('token')
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
    let {isLoading, dataLoaded, chats, offline, message, text } = this.state
    console.log()
    if (!cookie.get('token')){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <h4 className='forum-title'>Kontak Admin</h4>
        <div className="forum-box">
          <Forum dataLoaded={dataLoaded} chats={chats} message={message }offline={offline}/>
          <form ref='message' autoComplete='off'>
          <div className="input-group forum">
            <textarea type="text" className="form-control" style={{height:'40px'}} id='text' onBlur={e => this.handleText(e)} placeholder="Pertanyaan" aria-label="pertanyaan" aria-describedby="basic-addon2"/>
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
