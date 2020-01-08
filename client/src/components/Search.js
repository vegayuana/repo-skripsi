import React, { Component } from 'react'
import '../styles/page.css';

export class Search extends Component {
  render() {
    return (
      <div className="row search-box">
        <div className="col-sm-12">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Kata Kunci" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fa fa-search"></i></button>
            </div>
          </div>
        </div>
      </div> 
    )
  }
}

export default Search
