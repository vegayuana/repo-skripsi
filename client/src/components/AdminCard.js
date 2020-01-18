import React from 'react'
import { FaFileAlt, FaUserCheck } from 'react-icons/fa';

export default function AdminCard(props) {
  return (
    <div>
      <div className="row no-margin">
        <div className="col-md-4 card-icon">
          {props.icon === 'Akun' ?
            <FaUserCheck className="icon"/> :
              <FaFileAlt className="icon"/> }
        </div>
        <div className="col-md-8 card-text"><p>{props.menu}</p></div>
      </div>
    </div>
  )
}