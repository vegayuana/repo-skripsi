import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export class List extends Component {
  state={
    isLoaded: false,
    skripsiColl:[]
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
        skripsiColl: res.data,
        isLoaded: true
      })
    })
  }
  render() {
    let { isLoaded, skripsiColl} = this.state
    return (
      <>
      { !isLoaded ? <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
        : 
        skripsiColl.map((skripsi, i) =>
          <Link to={'/skripsi-detail/'+skripsi.id} key={i}>
          <div className="list-box">
            <div className="list row">
              <div className="col-sm-10">
                <b><h5>{skripsi.title}</h5></b>
                <p>{skripsi.name}</p>
                <p><i>{skripsi.category}</i></p>
              </div>
              <div className="col-sm-2 float-right">
                <h5 className="float-right">{skripsi.published_year}</h5>
              </div> 
            </div>
          </div>
          </Link>
         )
       } 
      </>
    )
  }
}

export default List