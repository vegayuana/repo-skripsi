import React, { Component } from 'react'

export class DetailSkripsi extends Component {
  render() {
    return (
      <>
      <div className="content">      
        <div className="row">
        <div className="col-md-4 col-sm-12">
          <div className="detail-box">
            <h4>Identitas</h4>
            <hr/>
            <h5>Judul</h5>
            <p>Judul</p>
            <h5>Pengarang</h5>
            <p>Nama Pengarang</p>
            <h5>Pembimbing</h5>
            <p>Nama Pembimbing</p>
            <h5>Tahun</h5>
            <p>2017</p>
            <h5>Kategori</h5>
            <p>Kategori</p>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="detail-box">
            <h4>Abstrak</h4>
            <hr/>
            <p>lorem ipsum</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="file-box">
          <h5>File</h5>
          <hr/>
          <p>file 1</p>
        </div>
        </div>
      </div>
      </div>

      </>
    )
  }
}

export default DetailSkripsi
