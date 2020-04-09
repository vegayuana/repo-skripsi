import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {Document, pdfjs, Page} from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
export class SkripsiDetail extends Component {
  state={
    skripsi:[], 
    isLoaded:false,
    offline:false,
    pageNumber:1,
    numPages:null
  }
  getData =()=>{
    let id = this.props.match.params.id
    if(this.props.token){
      axios({
        method: 'get',
        url: `/skripsi/detail/`,
        params:{
          id : id
        },
        headers: {
          Authorization: this.props.token
        } 
      }).then(res=>{
        this.setState({ 
          skripsi: res.data[0],
          isLoaded: true
        })
      }).catch(err=>{
        if(err.response){
        console.log(err.response)
        }
      })
    }
    else{
      axios({
        method: 'get',
        url: `/skripsi/info/`,
        params:{
          id : id
        }
      }).then(res=>{
        this.setState({ 
          skripsi: res.data[0],
          isLoaded: true
        })
      }).catch(err=>{
        if(err.response){
        console.log(err.response)
        }
      })
    }
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  next = () => {
    let {pageNumber, numPages} = this.state
    if( pageNumber<=numPages){
      this.setState({pageNumber:this.state.pageNumber+1})
    }
  }
  before = () => {
    let {pageNumber} = this.state
    if( pageNumber>1){
      this.setState({pageNumber:this.state.pageNumber-1})
    }
  }
  componentDidMount(){
    if (navigator.onLine){
      this.getData()
      this.setState({
        offline:false
      })
    }
    else{
      this.setState({
        offline:true,
      })
    }
  }
  render() {
    let { isLoaded, skripsi, offline, pageNumber, numPages} = this.state 
    return (
      <div className="main-box"> 
        { offline ? 
        <div className="row">
          <div className="col-12">
            <div className="line"></div>
            <div className="offline-box">
              <p>Anda sedang offline. Cek koneksi anda dan refresh </p>
            </div>
          </div>
        </div>
        :
        <>  
        <div className="row">
          <div className="col-12 col-md-4 identity">
            <div className="small-box">
            <div className="line"></div>
            <div className="detail-box">
              { !isLoaded ? <Spinner animation="border" variant="secondary" /> :
              <>
                { !skripsi ? <>No Data</> :
                  <>
                  <div className="detail-header">
                    <h4>IDENTITAS</h4>
                    <hr/>
                  </div>
                  <h5>Judul</h5>
                  <p>{skripsi.title}</p>
                  <h5>Penulis</h5>
                  <p>{skripsi.name}</p>
                  <h5>Tahun</h5>
                  <p>{skripsi.published_year}</p>
                  <h5>Kategori</h5>
                  <p>{skripsi.category===1 ? <>Artificial Intelligence</> : skripsi.category===2 ? <>Sistem Informasi</> : skripsi.category===3 ? <>Jaringan Komputer</> : <>-</> }</p>
                  <h5>Kata Kunci</h5>
                  <p>{skripsi.keywords ? skripsi.keywords : <>-</>}</p>
                  </>
                }
              </>
              }
            </div>
            </div>
          </div>
          <div className="col-12 col-md-8 abstract">
            <div className="small-box">
            <div className="line" style={{ backgroundColor: '#8ee4af '}}></div>
            <div className="detail-box">
              {!isLoaded ? <Spinner animation="border" variant="secondary" /> :
              <>
              { !skripsi ? <>No Data</> :
              <>
              <div className="detail-header">
                <h4>ABSTRAK</h4>
                <hr/>
              </div>
              <p>{skripsi.abstrak}</p>
              <hr/>
              <p>{skripsi.abstract}</p>
              </>
              }
              </>}
            </div>
            </div>
          </div>
        </div>
        {!this.props.token? <></> :
        <div className="row file">
          <div className="col-12">
            <div className="small-box">
              <div className="line" style={{backgroundColor:'#5cdb95'}}></div>
              <div className="detail-box">
                <h5>FILE</h5>
                <hr/>
                {!isLoaded ? <Spinner animation="border" variant="secondary" /> :<>
                { !skripsi ? <>No Data</> :
                <>
                <Document file={'https://repositori-skripsi.herokuapp.com/'+skripsi.file_url}
                onLoadSuccess={this.onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
                <div className="btn-pdf-box"> 
                  <button className="btn btn-primary btn-pdf" disabled={pageNumber===1? true: false} onClick={()=>this.before()}><FaChevronLeft/></button>
                  <p className="no-margin num-page">Page {pageNumber} of {numPages}</p>
                  <button className="btn btn-primary btn-pdf" disabled={pageNumber===18? true: false} onClick={()=>this.next()}><FaChevronRight/></button>
                </div>
                </>
                }
              </>
              }
              </div>
            </div>
          </div>
        </div>
        }
        </>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
  }
}
export default connect(mapStateToProps, null)(SkripsiDetail)