import React, { Component } from 'react'
import '../styles/footer.css'
import logo from '../icons/logo.png'
export class Footer extends Component {
  render() {
    return (
      <div className="footer row no-margin">
        <div className="col-md-6">
          <h4>Lokasi Perpustakaan</h4>
          <p>Gd. Dekanat FMIPA Unpad, Jl. Raya Bandung Sumedang No.Km 21, Hegarmanah, Kec. Jatinangor, Kabupaten Sumedang, Jawa Barat 45361</p>
          <p>(022) 7797712</p>
          <hr/>
          <h5>Waktu Operasional</h5>
          <p>Senin - Kamis (08.00–15.00)</p>
        </div>
        <div className="col-md-4 offset-md-2" >
          <img src={logo} alt="Logo" className="logo"/>
          <h5>Repositori Skripsi Digital</h5>
          <p>Teknik Informatika Unpad</p>
        </div>
      </div>
    )
  }
}

export default Footer
