import React, { Component } from 'react'
import List from './List'
import '../styles/page.css';

export class Content extends Component {
  render() {
    return (
      <div className="content row">
        <div className="col-md-3 col-sm-12 filter-box">
          <p className="no-margin">Saring Berdasarkan</p>
          <div className="row">
            <div className="col-sm-6 col-md-12">
              <div className="dropdown">
                <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Topik
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Artificial Inteligence</a>
                  <a className="dropdown-item" href="#">Jaringan Komputer</a>
                  <a className="dropdown-item" href="#">Sistem Informasi</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-12"> 
              <div className="dropdown">
                <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tahun
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">2012</a>
                  <a className="dropdown-item" href="#">2013</a>
                  <a className="dropdown-item" href="#">2014</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9 col-sm-12">
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          <div className="list-box">
            <List></List>
          </div>
          
          
          {/* <ul class="pagination justify-content-end">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul> */}
        </div>
        
      </div>
    )
  }
}

export default Content
