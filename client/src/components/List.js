import React, { Component } from 'react'
import axios from 'axios'
export class List extends Component {
  state={
    isLoaded: true,
    theSkripsi:[]
  }
  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/skripsi/',
      Headers: {
        
      }
    })
    .then(res=>{
      this.setState({ 
        theSkripsi: res.data,
        isLoaded: false
      })
    })
  }
  render() {
    let { isLoaded, theSkripsi} = this.state
    return (
      <>
      { isLoaded ? <div>Loading...</div> : 
        theSkripsi.map((skripsi, i) =>
          <div className="list-box">
            <div className="list row" key={i}>
              <div className="col-sm-10 ">
                <b><h5>{skripsi.title}</h5></b>
                <p>Penulis</p>
                <p>{skripsi.category}</p>
              </div>
              <div className="col-sm-2 float-right">
                <h5 className="float-right">{skripsi.published_year}</h5>
              </div> 
            </div>
          </div>
        )
      }
      </>
    )
  }
}
export default List;