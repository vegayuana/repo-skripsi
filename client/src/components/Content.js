import React from 'react'
import List from './List'
import '../styles/page.css';

export default function Content() {
  return (
    <div className="main-box row">
        <div className="col-md-3 col-sm-12 filter-box">
          <p className="no-margin">Saring Berdasarkan</p>
          <div className="row">
            <div className="col-sm-6 col-md-12">
              <div className="dropdown">
                <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Topik
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item">Artificial Inteligence</button>
                  <button className="dropdown-item">Jaringan Komputer</button>
                  <button className="dropdown-item">Sistem Informasi</button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-12"> 
              <div className="dropdown">
                <button className="btn filter btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tahun
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item">2012</button>
                  <button className="dropdown-item">2013</button>
                  <button className="dropdown-item">2014</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9 col-sm-12">
          <List></List>
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
