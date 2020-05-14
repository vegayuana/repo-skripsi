import React, { PureComponent } from 'react'
import axios from 'axios'
import ListCard from './ListCard'
import { FaSearch } from 'react-icons/fa'
import Pagination from './Pagination'
import { connect } from 'react-redux'
import { setList, delList } from '../reducers/listReducer'

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
        skripsiFilteredTemp:res.data,
        skripsiFilteredCat:res.data,
        skripsiFilteredYear:res.data,
        years: [...new Set(res.data.map((year)=>{
          return year.published_year
        }))].sort()
      })
      this.props.set_list(res.data)
      // localStorage.setItem('list', JSON.stringify(res.data))
    }).catch((err) => { 
      if(err.response) console.log(err.response)
    })
  }
  componentDidMount(){
    if (navigator.onLine){
      this.getSkripsi()
      this.setState({
        offline:false
      })
    }
    else{
      // if (localStorage.getItem('list')){
        // let data = JSON.parse(localStorage.getItem('list'))
        // this.setState({ 
        //   skripsi: data,
        //   isLoaded: true,
        //   skripsiFiltered:data,
        //   skripsiFilteredTemp:data,
        //   skripsiFilteredCat:data,
        //   skripsiFilteredYear:data,
        //   years: [...new Set(data.map((year)=>{
        //     return year.published_year
        //   }))].sort()
        // })
        let {listSkripsi} = this.props
        if (listSkripsi){
        this.setState({ 
          skripsi: listSkripsi,
          isLoaded: true,
          skripsiFiltered:listSkripsi,
          skripsiFilteredTemp:listSkripsi,
          skripsiFilteredCat:listSkripsi,
          skripsiFilteredYear:listSkripsi,
          years: [...new Set(listSkripsi.map((year)=>{
            return year.published_year
          }))].sort()
        })
      }
    }
  }
  onChange =(e)=>{
    let text = e.target.value.toLowerCase().trim()
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
    this.setState({
      currentPage:1
    })
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
    let {skripsi, year} = this.state
    this.setState({
      currentPage:1
    })
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
        skripsiFiltered:filteredData,
        skripsiFilteredTemp:filteredData,
      })
    }
  }
  render() {
    let {isLoaded, skripsiFiltered, years, yearSelection, cat, currentPage, postsPerPage} = this.state
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
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2"><FaSearch/></button>
            </div>
            <input type="text" className="form-control" onChange={this.onChange} placeholder="Nama Penulis, Judul, atau Kata Kunci Terkait" aria-label="search" aria-describedby="button-addon2" />
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
                    {cat==='1' ? <>SCSG</> : cat==='2' ? <>SIRPL</> : cat==='3' ? <>JKKD</> : cat==='4'? <>IKMN</> : <>Bidang Minat</> }
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={this.categoryFilter} id="all">Semua</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={1}>Sistem Cerdas dan Sistem Grafika (SCSG)</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={2}>Sistem Informasi dan Rekayasa Perangkat Lunak (SIRPL)</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={3}>Jaringan Komputer dan Komunikasi Data (JKKD)</button>
                    <button className="dropdown-item" onClick={this.categoryFilter} id={4}>Ilmu Komputasi dan Metode Numerik (IKMN)</button>
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

const mapDispatchToProps = dispatch => {
  return {
    set_list: (data) => dispatch(setList(data)),
    del_list: () => dispatch(delList())
  }
}
const mapStateToProps = state => {
  return{
    listSkripsi: state.list.skripsi,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)