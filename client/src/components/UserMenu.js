import React, { Component } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import MediaQuery from 'react-responsive'

export default class UserMenu extends Component {
  componentDidMount(){
    $(document).on("click", (event)=>{
      if($(event.target).closest("#btn-menu").length){
        $('#userMenu').toggleClass('show')
      }
      else{
        if(!$(event.target).closest("#userMenu").length){
          console.log('diluar')
          $('#userMenu').removeClass("show")
        }
      }
    })
    $('#userMenu a').click(()=>{
      $('#userMenu').removeClass("show")
    })
  }
  render() {
    return (
      <>
      <MediaQuery query="(min-width:768px)">
      <div className="right">
        <button className="btn btn-nav btn-user" id="btn-menu" style={{zIndex:1}}>
          <FaUserAlt />
        </button>
          <div className='user-menu' id="userMenu">
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