import React, { Component } from 'react'
import moment from 'moment'
import { Spinner } from 'react-bootstrap'

export default class Question extends Component {
  render() {
    let {dataLoaded, chats, offline, message } =this.props
    return (
      <div className='forum-content'>
        {offline? <div className="text-middle"><p>Anda sedang offline. Cek koneksi anda dan refresh </p> </div>
          : !dataLoaded? <div className="text-middle"><Spinner animation="border" variant="secondary"/></div>
          : <>
          {!chats? <></> : chats.length===0 ? <div className="text-middle"><p>Belum ada pesan yang dikirim</p></div> :
          <>
          {!message? <></> : 
            <div className="alert alert-warning" style={{margin: '10px 10px 0px'}} role="alert">
              <strong>{message}</strong>
            </div> 
          }
          {chats.map((chat,i)=>
            <div className={chat.from==='user'? "forum-text forum-text-user" : "forum-text forum-text-admin"} key={i}>
              <div className="head">
                <b>{chat.from==='user'? chat.name : 'Admin'}</b>
              </div>
              <p>{chat.text}</p>
              <p style={{fontSize: 'smaller', color:'grey'}}>{moment(chat.sent_at).format("YYYY-MM-D H:mm:ss")}</p>
            </div>
          )}
          </>
          }
          </>
        }
      </div>
    )
  }
}

