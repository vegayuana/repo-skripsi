import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'

export default function AdminMenu(props) {
  return (
    <div className="right admin-menu">
      <div className="dropdown">
        <button className="btn btn-green dropdown-toggle" type="button" id="dropdownAdminMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <FaUserAlt/>  ADMIN
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownAdminMenu">
          <Link to='/admin' className="dropdown-item" style={{marginBottom:'0.5rem'}}>Admin Page</Link>
          <Link to='/' className="dropdown-item" onClick={()=>props.logout()} >Log Out</Link>
        </div>
      </div>
    </div>
  )
}
