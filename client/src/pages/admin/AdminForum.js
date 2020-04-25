import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner, Breadcrumb } from 'react-bootstrap'
import Forum from '../../components/Forum'
import axios from 'axios'

class AdminForum extends Component {
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
    let id = this.props.match.params.id
    let {text} =this.state
    e.preventDefault()
    if(text){
      this.setState({
        isLoading:true
      })
      axios({
        method: 'post',
        url: '/admin/insert-text',
        headers: {
          Authorization:this.props.token
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
  getForum= () =>{
    let id = this.props.match.params.id
    axios({
      method: 'get',
      url: '/admin/forum',
      params:{
        id : id
      },
      headers: {
        Authorization:this.props.token
      } 
    }).then(res=>{
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
    if (!this.props.token || this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
         <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Link to='/forum-list'> / Pertanyaan</Link>
          <Breadcrumb.Item active> / Kontak</Breadcrumb.Item>
        </Breadcrumb>
        <div className="forum-box">
          <Forum dataLoaded={dataLoaded} message={message} chats={chats} offline={offline}/>
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
    role : state.auth.role
  }
}
export default connect(mapStateToProps, null)(AdminForum)