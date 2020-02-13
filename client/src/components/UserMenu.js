import React, { Component } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import MediaQuery from 'react-responsive'

export default class UserMenu extends Component {
  state={
    elmClass:'user-menu'
  }
  componentDidMount(){
    $('#userMenu a').click(()=>{
      $('#userMenu').removeClass( "show" )
      this.setState({
        elmClass:'user-menu'
      })
    })
  }
  handleClick=(e)=>{
    e.preventDefault()
    let {elmClass} = this.state
    if(elmClass==='user-menu'){
      this.setState({
        elmClass:'user-menu show'
      })
    }
    else{
      this.setState({
        elmClass:'user-menu'
      })
    }
    
  }
  render() {
    return (
      <>
      <MediaQuery query="(min-width:768px)">
      <div className="right">
        <button className="btn btn-nav btn-user" onClick={(e)=>this.handleClick(e)} style={{zIndex:1}}>
          <FaUserAlt />
        </button>
          <div className={this.state.elmClass} id="userMenu">
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