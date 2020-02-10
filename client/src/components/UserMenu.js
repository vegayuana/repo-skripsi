import React, { Component } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import MediaQuery from 'react-responsive'

export default class UserMenu extends Component {
  componentDidMount(){
    $('.collapse a').click(()=>{
      $('.collapse').removeClass( "show" )
    })
  }
  render() {
    return (
      <>
      <MediaQuery query="(min-width:768px)">
      <div className="right">
        <button className="btn btn-nav btn-user" id="tes" data-toggle="collapse" data-target="#userMenu" aria-expanded="false" aria-controls="userMenu" style={{zIndex:1}}>
          <FaUserAlt />
        </button>
        <li className="nav-item navbar-nav">
          <div className="collapse user-menu" id="userMenu">
            <Link to="/profile" className="dropdown-item" style={{marginTop:'80px'}}>
              Profil
            </Link>
            <Link to="/upload" className="dropdown-item">
              Unggah Skripsi
            </Link>
            <Link to="/" className="dropdown-item" onClick={()=>this.props.logout()}>
              Log Out
            </Link>
          </div>
        </li>
      </div>
      </MediaQuery>
      <MediaQuery query="(max-width:767px)">
       <ul className="navbar-nav">
         <li className="nav-item right">
           <Link to="/" className="btn btn-nav btn-transition" onClick={() => this.props.logout()}>
             Log out
           </Link>
         </li>
       </ul>
     </MediaQuery>
     </>
    )
  }
}