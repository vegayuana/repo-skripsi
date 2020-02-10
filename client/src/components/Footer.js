import React, { Component } from 'react'
import '../styles/footer.css'
import logo from '../icons/logo.webp'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import {AiFillHome} from 'react-icons/ai'
import {MdFileUpload} from 'react-icons/md'
import {FaUserAlt} from 'react-icons/fa'
export class Footer extends Component {
  render() {
    console.log('footer')
    return (
      <>
      <div className="footer row no-margin">
        <div className="col-md-8 no-padding">
          <h5>Lokasi Perpustakaan</h5>
          <p>Gd. Dekanat FMIPA Unpad, Jl. Raya Bandung Sumedang No.Km 21, Hegarmanah, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45361</p>
          <p>(022) 7797712</p>
          <hr/>
          <h5>Waktu Operasional</h5>
          <p>Senin - Kamis (08.00–15.00)</p>
        </div>
        <div className="col-md-4 no-padding">
          <img src={logo} alt="Logo" className="logo"/>
          <h5>Repositori Skripsi Digital</h5>
          <p>Teknik Informatika Unpad</p>
        </div>
      </div>
      { !this.props.token || this.props.role!=='user' ? <></> :
      <MediaQuery query="(max-width:767px)">
      <nav className='foot-nav'>
        <Link to='/'><AiFillHome/></Link>
        <Link to='/upload'><MdFileUpload style={{fontSize:'2.1rem'}}/></Link>
        <Link to='/profile'><FaUserAlt/></Link>
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
export default connect(mapStateToProps, null)(Footer)