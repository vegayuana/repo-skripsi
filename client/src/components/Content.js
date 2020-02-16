import React, { PureComponent } from 'react'
import axios from 'axios'
import ListCard from './ListCard'
import { FaSearch } from 'react-icons/fa'
import Pagination from './Pagination'

export class Content extends PureComponent {
  state={
    isLoaded: false,
    skripsi:[], 
    skripsiFiltered:[],
    skripsiFilteredTemp:[],
    years:[],
    year:null,
    yearSelection: 'Tahun',
    cat:null,
    categorySelection: 'Bidang Minat',
    currentPage:1,
    postsPerPage:10
  }
  getSkripsi=()=>{
    axios({
      method: 'get',
      url: '/skripsi/list',
    }).then(res=>{
      console.log(res.data)
      this.setState({ 
        skripsi: res.data,
        isLoaded: true,
        skripsiFiltered:res.data,
        skripsiFilteredTemp:res.data,
        skripsiFilteredCat:res.data,
        skripsiFilteredYear:res.data,
        years: [...new Set(res.data.map((year)=>{
          return year.published_year
        }))].sort()
      })
      localStorage.setItem('list', JSON.stringify(res.data))
    }).catch((err) => { 
      if (localStorage.getItem('list')){
        let data = JSON.parse(localStorage.getItem('list'))
        this.setState({ 
          skripsi: data,
          isLoaded: true,
          skripsiFiltered:data,
          skripsiFilteredTemp:data,
          skripsiFilteredCat:data,
          skripsiFilteredYear:data,
          years: [...new Set(data.map((year)=>{
            return year.published_year
          }))].sort()
        })
      }
      if(err.response) console.log(err.response)
    })
  }
  componentDidMount(){
    this.getSkripsi()
  }
  onChange =(e)=>{
    let text = e.target.value.toLowerCase()
    let {skripsiFilteredTemp} = this.state
    const filteredData = skripsiFilteredTemp.filter(item => {
      if (item.keywords){
        return item.title.toLowerCase().includes(text) || item.name.toLowerCase().includes(text) || item.keywords.toLowerCase().includes(text)
      }
      return item.title.toLowerCase().includes(text) || item.name.toLowerCase().includes(text) 
    })
    this.setState({
      skripsiFiltered:filteredData,
    }) 
  }
  yearFilter = (e)=>{
    let year = e.target.id
    let {skripsi, cat} = this.state
    //All
    if(year==='Tahun'){
      if (cat){
        let filteredData = skripsi.filter(item => {
          // eslint-disable-next-line 
          return item.category==cat
        })
        this.setState({
          skripsiFiltered:filteredData,
          skripsiFilteredTemp:filteredData,
        })
      }
      else{
        this.setState({
          skripsiFiltered:skripsi,
          skripsiFilteredTemp:skripsi,
        })
      }
      this.setState({
        year:null,
        yearSelection:'Tahun',
      })
    }
    //Costumize
    else{
      let filteredData
      if(cat){
        filteredData = skripsi.filter(item => {
          // eslint-disable-next-line 
          return item.published_year == year && item.category== cat
        })
      }
      else{
        filteredData = skripsi.filter(item => {
          // eslint-disable-next-line 
          return item.published_year == year 
        })
      }
      this.setState({
        year:year,
        yearSelection:year,
        skripsiFiltered:filteredData,
        skripsiFilteredTemp:filteredData,
      })
    }
  }
  categoryFilter = (e)=>{
    let cat = e.target.id
    let text = e.target.innerText
    let {skripsi, year} = this.state
    //All
    if (cat==='all'){
      if (year){
        let filteredData = skripsi.filter(item => {
          // eslint-disable-next-line 
          return item.published_year==year
        })
        this.setState({
          skripsiFiltered:filteredData,
          skripsiFiltereTemp:filteredData
        })
      }
      else{
        this.setState({
          skripsiFiltered:skripsi,
          skripsiFilteredTemp:skripsi,
        })
      }
      this.setState({
        cat:null,
        categorySelection:'Bidang Minat',
      })
    } 
    //Costumize
    else{
      let filteredData
      if(year){
        filteredData = skripsi.filter(item => {
          // eslint-disable-next-line 
          return item.published_year == year && item.category== cat
        })
      }
      else{
        filteredData = skripsi.filter(item => {
          // eslint-disable-next-line 
          return item.category==cat 
        })
      }
      this.setState({
        cat:cat,
        categorySelection:text,
        skripsiFiltered:filteredData,
        skripsiFilteredTemp:filteredData,
      })
    }
  }
  render() {
    console.log('render content')
    let {isLoaded, skripsiFiltered, years, yearSelection, categorySelection, currentPage, postsPerPage} = this.state
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
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
            <input type="text" className="form-control" onChange={this.onChange} placeholder="Nama Penulis, Judul, atau Kata Kunci Terkait" aria-label="Recipient's username" aria-describedby="button-addon2" />
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
              <div className="col-12"> 
                <div className="dropdown">
                  <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {yearSelection}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={this.yearFilter} id="Tahun">Semua</button>
                    {years.map((year, i)=>
                      <button key={i} className="dropdown-item" onClick={this.yearFilter} id={year}>{year}</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12"> 
                <div className="dropdown">
                  <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {categorySelection}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={this.categoryFilter} id="all">Semua</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={1}>Artifical Intelligence</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={2}>Sistem Informasi</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={3}>Jaringan Komputer</button>
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