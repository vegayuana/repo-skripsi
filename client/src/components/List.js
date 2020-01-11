import React, { Component } from 'react'
export class List extends Component {
  render() {
    return (
      <div className="list row">
        <div className="col-sm-10 ">
          <b><h5>Judul</h5></b>
          <p>Penulis</p>
          <p>Kategori</p>
        </div>
        <div className="col-sm-2 float-right">
          <h5 className="float-right">2016</h5>
        </div> 
      </div>
    )
  }
}
export default List;