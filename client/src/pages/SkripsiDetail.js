import React, { Component } from 'react'
import axios from 'axios'
export class SkripsiDetail extends Component {
  state={
    skripsi:[], 
    isLoaded:false
  }
  getData =()=>{
    let id = this.props.match.params.id
    axios({
      method: 'get',
      url: `http://localhost:3000/skripsi/detail/${id}`,
      Headers: {
      }
    })
    .then(res=>{
      this.setState({ 
        skripsi: res.data[0],
        isLoaded: true
      })
    })
  }

  componentDidMount(){
    this.getData()
  }
  render() {
    
    let { isLoaded, skripsi, skripsiId} = this.state
    console.log(skripsiId, 'ini id ')
    console.log(skripsi)
    return (
      <div className="main-box">      
        { !isLoaded ? 
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="detail-box">
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div className="detail-box">
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : 
          <>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="detail-box">
                <h4>Identitas</h4>
                <hr/>
                <h5>Judul</h5>
                <p>{skripsi.title}</p>
                <h5>Pengarang</h5>
                <p>{skripsi.name}</p>
                {/* <h5>Pembimbing</h5>
                <p>Nama Pembimbing</p> */}
                <h5>Tahun</h5>
                <p>{skripsi.published_year}</p>
                <h5>Kategori</h5>
                <p>{skripsi.category}</p>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div className="detail-box">
                <h4>Abstrak</h4>
                <hr/>
                <p>{skripsi.abstract}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="file-box">
                <h5>File</h5>
                <hr/>
                <p>{skripsi.file_url}</p>
              </div>
            </div>
          </div>
          </>
        }
      </div>
    )
  }
}
export default SkripsiDetail
