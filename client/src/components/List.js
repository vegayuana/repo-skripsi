import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Skripsi from './Skripsi'

export default function List(props) {
  let { isLoaded, skripsi} = props
  let token = useSelector(state => state.auth.token)
  return (
    <>
      { !isLoaded ?
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>  
        :  skripsi.length===0 ? <div>No Data Found</div> :
        skripsi.map((item, i) =>
          !token ? <Skripsi skripsi={item} key={i}></Skripsi> : 
          <Link to={'/skripsi-detail/'+item.id} key={i}>
            <Skripsi skripsi={item}></Skripsi>
          </Link>
        )
      }
      </>
  )
}