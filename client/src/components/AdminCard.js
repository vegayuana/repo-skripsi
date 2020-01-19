import React from 'react'
import { FaFileAlt, FaUserCheck } from 'react-icons/fa';

export default function AdminCard(props) {
  return (
    <div className="row no-margin">
      <div className="col-4 card-icon">
        {props.icon === 'Akun' ?
          <FaUserCheck className="icon"/> :
            <FaFileAlt className="icon"/> }
      </div>
      <div className="col-8 card-text"><p className="no-margin">{props.menu}</p></div>
    </div>
  )
}