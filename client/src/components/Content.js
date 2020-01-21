import React, { Component } from 'react'
import axios from 'axios'
import List from './List'
import '../styles/page.css'
import {FaSearch} from 'react-icons/fa'

export class Content extends Component {
  state={
    isLoaded: false,
    skripsi:[], 
    skripsiFiltered:[],
    yearSelection: 'Tahun' 
  }
  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/skripsi/list',
      Headers: {
      }
    })
    .then(res=>{
      this.setState({ 
        skripsi: res.data,
        isLoaded: true,
        skripsiFiltered:res.data
      })
    })
  }
  onChange =(e)=>{
    let text = e.target.value.toLowerCase()
    let {skripsi} = this.state
    const filteredData = skripsi.filter(item => {
      return item.title.toLowerCase().includes(text) || item.name.toLowerCase().includes(text) 
    })
    this.setState({
      skripsiFiltered:filteredData
    })    
  }
  yearFilter = (e)=>{
    let year = e.target.id
    let {skripsi} = this.state
    if(year==='Tahun'){
      this.setState({
        skripsiFiltered:skripsi
      })
    }
    else{
      const filteredData = skripsi.filter(item => {
        return item.published_year == year 
      })
      this.setState({
        yearSelection:year,
        skripsiFiltered:filteredData
      })
    }
  }
  render() {
    let {isLoaded, skripsiFiltered} = this.state
    return (
      <>
      <div className="row search-box">
        <div className="col-12">
          <div className="input-group">
            <input type="text" className="form-control" onChange={this.onChange} placeholder="Kata Kunci" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2"><FaSearch/></button>
            </div>
          </div>
        </div>
      </div> 
      <div className="main-box row">
        <div className="col-12 col-md-3 filter-box">
          <p className="no-margin">Saring Berdasarkan</p>
          <div className="row">
            <div className="col-6 col-12">
              <div className="dropdown">
                {/* <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Topik
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item">Artificial Inteligence</button>
                  <button className="dropdown-item">Jaringan Komputer</button>
                  <button className="dropdown-item">Sistem Informasi</button>
                </div> */}
              </div>
            </div>
            <div className="col-6 col-md-12"> 
              <div className="dropdown">
                <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.state.yearSelection}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item" onClick={this.yearFilter} id="Tahun">All</button>
                  <button className="dropdown-item" onClick={this.yearFilter} id="2020">2020</button>
                  <button className="dropdown-item" onClick={this.yearFilter} id="2013">2013</button>
                  <button className="dropdown-item" onClick={this.yearFilter} id="2014">2014</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <List skripsi={skripsiFiltered} isLoaded={isLoaded}></List>
          {/* <ul class="pagination justify-content-end">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul> */}
        </div>
      </div>
      </>
    )
  }
}

export default Content
