import React, { Component } from 'react'
import { Spinner, Breadcrumb } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import {MdNotificationsActive} from 'react-icons/md'
import {FaCheck} from 'react-icons/fa'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

export class ForumList extends Component {
  state={
    isLoaded:false,
    offline:false,
    forums:[],
    users:[],
    selectedUser:null,
  }
  getForums = () =>{
    axios({
      method: 'get',
      url: '/admin/forum-list',
      headers: {
        Authorization: this.props.token
      } 
    }).then(res=>{
      let data= []
      const map = new Map();
      for (let item of res.data){
        if(!map.has(item.name)){
          map.set(item.name, true)
          data.push({
            id: item.id.substring(0,12),
            text: item.text,
            status: item.status, 
            sent_at: item.sent_at, 
            name:item.name
          })
        }
      }
      this.setState({ 
        forums: data,
        isLoaded: true
      })
    }).catch((err) => { 
      if(err.response){
      console.log(err.response.statusText)
      }
      this.setState({
        isLoaded:true
      })
    })
  }
  getUser=()=>{
    axios({
      method: 'get',
      url: '/admin/user-list',
      headers: {
        Authorization: this.props.token
      } 
    }).then(res=>{
      console.log(res.data)
      this.setState({
        users:res.data
      })
    })
  }
  componentDidMount(){
    scrollToTop()
    if (navigator.onLine){
      this.getUser()
      this.getForums()
      this.setState({
        offline:false
      })
    }
    else{
      this.setState({
        isLoaded:true,
        offline:true,
      })
    }
  }
  render() {
    let {offline, isLoaded, forums, selectedUser} = this.state
    if (!this.props.token || this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Breadcrumb.Item active> / Pertanyaan</Breadcrumb.Item>
        </Breadcrumb>
        <div className="autocomp-box">
          <div style={{width:'-webkit-fill-available'}}>
          <Autocomplete
            id="combo-box-demo"
            options={this.state.users}
            getOptionLabel={option => option.npm + ' - ' + option.name}
            onChange={(e,v) => this.setState({selectedUser:v})}// onChange={this.handleSelected}
            renderInput={params => <TextField {...params} onChange={({ target }) => this.setState({selectedUser: target.value})} label="Mahasiswa" variant="outlined" />}
          />
          </div>
          <div style={{width:'120px'}}>
            {selectedUser===null? <button className='btn btn-blue btn-send'>Kirim Pesan</button> 
            : <Link to={'/admin-forum/'+selectedUser.npm} ><button className='btn btn-blue' style={{height:'56px', float:'right'}}>Kirim Pesan</button></Link>}
          </div>
        </div>
        {offline? <div className="text-middle"><p>Anda sedang offline. Cek koneksi anda dan refresh </p> </div>
        : !isLoaded ? <div className="text-middle"><Spinner animation="border" variant="secondary"/></div>
        : !forums ? <div style={{textAlign:'center'}}>Tidak ada pertanyaan</div>
        : forums.length===0 ? <div style={{textAlign:'center'}}>Tidak ada pertanyaan</div> :
        forums.map((forum, i) =>
          <Link to={'/admin-forum/'+forum.id} key={i}>
            <div className="list-box admin">
              <div className="list row">
                <div className="col-4">
                  <b><h5>{forum.name}</h5></b>
                </div>
                <div className="col-6">
                  <div className="ellipsis">
                    {forum.text}
                  </div>
                </div>
                <div className="col-2 float-right">
                  <h5 className="float-right">{forum.status===1? <FaCheck className="icon-check"/> : <MdNotificationsActive className ="text-danger" style={{fontSize:'1.3rem'}}/>}</h5>
                </div> 
              </div>
            </div>
          </Link>
        )
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
export default connect(mapStateToProps, null)(ForumList)