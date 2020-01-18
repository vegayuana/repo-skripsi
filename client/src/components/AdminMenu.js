import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { FaUserAlt } from 'react-icons/fa'

export default function AdminMenu(props) {
  return (
    <div className="right">
      <Dropdown>
        <Dropdown.Toggle className="btn-green" id="dropdown-basic">
          <FaUserAlt/>  ADMIN
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item ><Link to='/admin'>Admin Page</Link></Dropdown.Item>
          <Dropdown.Item href="/" onClick={()=>props.logout()} >Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
