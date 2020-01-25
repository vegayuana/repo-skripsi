import React, { PureComponent } from 'react'
import axios from 'axios'
import ListCard from './ListCard'
import { FaSearch } from 'react-icons/fa'
import Pagination from './Pagination';

export class Content extends PureComponent {
  state={
    isLoaded: false,
    skripsi:[], 
    skripsiFiltered:[],
    years:[],
    yearSelection: 'Tahun', 
    currentPage:1,
    postsPerPage:10
  }
  getSkripsi=()=>{
    axios({
      method: 'get',
      url: '/skripsi/list',
    }).then(res=>{
      this.setState({ 
        skripsi: res.data,
        isLoaded: true,
        skripsiFiltered:res.data,
        years: [...new Set(res.data.map((year)=>{
          return year.published_year
        }))]
      })
    }).catch((err) => { 
      console.log(err.response)
    })
  }
  componentDidMount(){
    this.getSkripsi()
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
    console.log('render content')
    let {isLoaded, skripsiFiltered, years, currentPage, postsPerPage} = this.state
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = skripsiFiltered.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = pageNumber => {
      this.setState({
        currentPage :pageNumber
      })
    }
    return (
      <>
      <div className="row search-box">
        <div className="col-12">
          <div className="input-group">
            <input type="text" className="form-control" onChange={this.onChange} placeholder="Kata Kunci (Penulis atau Judul)" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2"><FaSearch/></button>
            </div>
          </div>
        </div>
      </div> 
      <div className="main-box row">
        <div className="col-12 col-md-3">
          <div className="filter-box">
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
                    {years.map((year, i)=>
                      <button key={i} className="dropdown-item" onClick={this.yearFilter} id={year}>{year}</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <ListCard skripsi={currentPosts} isLoaded={isLoaded}></ListCard>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={skripsiFiltered.length}
            paginate={paginate}
          />
        </div>
      </div>
      </>
    )
  }
}

export default Content
