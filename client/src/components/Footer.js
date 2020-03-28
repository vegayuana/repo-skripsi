import React, { Component } from 'react'
import '../styles/footer.css'
import logo from '../icons/logo.png'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import {AiFillHome, AiFillQuestionCircle} from 'react-icons/ai'
import {MdFileUpload} from 'react-icons/md'
import {FaUserAlt} from 'react-icons/fa'
export class Footer extends Component {
  render() {
    const {pathname} = this.props.location;
    return (
      <>
      <div className='footer row no-margin'>
        <div className='col-md-8 no-padding'>
          <h5>Lokasi Perpustakaan</h5>
          <p>Gd. Dekanat FMIPA Unpad, Jl. Raya Bandung Sumedang No.Km 21, Hegarmanah, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45361</p>
          <p>(022) 7797712</p>
          <hr/>
          <h5>Waktu Operasional</h5>
          <p>Senin - Kamis (08.00–15.00)</p>
        </div>
        <div className='col-md-4 no-padding'>
          <img src={logo} alt='Logo' className='logo'/>
          <h5>Repositori Skripsi Digital</h5>
          <p>Teknik Informatika Unpad</p>
        </div>
      </div>
      { !this.props.token || this.props.role!=='user' ? <></> :
      <MediaQuery query='(max-width:767px)'>
        <nav className='foot-nav'>
          <Link to='/'><AiFillHome style={pathname==='/' ?{color:'#379683'}:{color:'#6c757d'}}/></Link>
          <Link to='/upload'><MdFileUpload style={pathname==='/upload' ? {fontSize:'2.1rem',color:'#379683'} :{color:'#6c757d',fontSize:'2.1rem'} }/></Link>
          <Link to='/user-forum'><AiFillQuestionCircle style={pathname.slice(0,11)==='/user-forum' ? {fontSize:'2rem', color:'#379683'}:{fontSize:'2rem', color:'#6c757d'}}/></Link>
          <Link to='/profile'><FaUserAlt style={pathname.slice(0,8)==='/profile' || pathname.slice(0,9)==='/reupload'  ?{color:'#379683'}:{color:'#6c757d'}}/></Link>
        </nav>
      </MediaQuery> 
      }
      </>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
    role: state.auth.role
  }
}
const wrappedFooter = withRouter(props=><Footer {...props}/>)
export default connect(mapStateToProps, null)(wrappedFooter)