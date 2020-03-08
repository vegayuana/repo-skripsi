import React from 'react'
import { FaFileAlt, FaUserCheck } from 'react-icons/fa'
import {AiFillQuestionCircle} from 'react-icons/ai'

export default function AdminCard(props) {
  return (
    <div className='row no-margin'>
      <div className='col-4 card-icon'>
        {props.icon === 'Akun' ?
        <FaUserCheck className='admin-icon'/> :
        props.icon ==='Skripsi' ?
        <FaFileAlt className='admin-icon'/> :
        <AiFillQuestionCircle className='admin-icon'/>}
      </div>
      <div className='col-8 card-text'><p className='no-margin'>{props.menu}</p></div>
    </div>
  )
}