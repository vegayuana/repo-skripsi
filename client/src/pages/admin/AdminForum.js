import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Spinner, Breadcrumb } from 'react-bootstrap'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import {Cookies} from 'react-cookie'
import Forum from '../../components/Forum'
const cookie = new Cookies()

export default class AdminForum extends Component {
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
    let id = this.props.match.params.id
    let {text} =this.state
    e.preventDefault()
    this.setState({
      isLoading:true
    })
    if(text){
      axios({
        method: 'post',
        url: '/admin/insert-text',
        headers: {
          Authorization:cookie.get('token')
        },
        data: {
          text: text,
          id:id
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
  getForum= () =>{
    let id = this.props.match.params.id
    axios({
      method: 'get',
      url: '/admin/forum',
      params:{
        id : id
      },
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
    if (!cookie.get('token') || this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
         <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Link to='/forum-list'> / Pertanyaan</Link>
          <Breadcrumb.Item active> / Forum</Breadcrumb.Item>
        </Breadcrumb>
        <div className="forum-box">
          <Forum dataLoaded={dataLoaded} message={message} chats={chats} offline={offline}/>
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
