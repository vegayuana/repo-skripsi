import React, { Component } from 'react'
import { Spinner, Breadcrumb } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import {scrollToTop} from '../../helpers/autoScroll'
import {MdNotificationsActive} from 'react-icons/md'
import {FaCheck} from 'react-icons/fa'
import {Cookies} from 'react-cookie'
const cookie = new Cookies()

export class QuestionList extends Component {
  state={
    isLoaded:false,
    offline:false,
    questions:[]
  }
  getQuestions = () =>{
    axios({
      method: 'get',
      url: '/admin/question-list',
      headers: {
        Authorization: cookie.get('token')
      } 
    }).then(res=>{
      let data= []
      const map = new Map();
      for (let item of res.data){
        if(!map.has(item.name)){
          map.set(item.name, true)
          data.push({
            npm: item.npm,
            text: item.text,
            status: item.status, 
            sent_at: item.sent_at, 
            form: item.from,
            name:item.name
          })
        }
      }
      this.setState({ 
        questions: data,
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
  componentDidMount(){
    scrollToTop()
    if (navigator.onLine){
      this.getQuestions()
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
    let {offline, isLoaded, questions} = this.state
    if (!cookie.get('token')|| this.props.role==='user'){
      return <Redirect to={'/'} />
    }
    return (
      <div className="main-box">
        <Breadcrumb>
          <Link to='/admin'>Home</Link>
          <Breadcrumb.Item active> / Pertanyaan</Breadcrumb.Item>
        </Breadcrumb>
        {offline? <div className="text-middle"><p>Anda sedang offline. Cek koneksi anda dan refresh </p> </div>
        : !isLoaded ? <div className="text-middle"><Spinner animation="border" variant="secondary"/></div>
        : !questions ? <div style={{textAlign:'center'}}>Tidak ada pertanyaan</div>
        : questions.length===0 ? <div style={{textAlign:'center'}}>Tidak ada pertanyaan</div> :
        questions.map((question, i) =>
          <Link to={'/question-admin/'+question.npm} key={i}>
            <div className="list-box admin">
              <div className="list row">
                <div className="col-4">
                  <b><h5>{question.name}</h5></b>
                </div>
                <div className="col-6">
                  <div className="ellipsis">
                    {question.text}
                  </div>
                </div>
                <div className="col-2 float-right">
                  <h5 className="float-right">{question.status===1? <FaCheck className="icon-check"/> : <MdNotificationsActive class="text-danger" style={{fontSize:'1.3rem'}}/>}</h5>
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
export default QuestionList
