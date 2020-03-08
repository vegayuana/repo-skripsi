import React from 'react'

export default function List(props) {
  let {skripsi} = props
  return (
    <div className="list-box transition-list">
      <div className="list row">
        <div className="col-10">
          <b><h5>{skripsi.title}</h5></b>
          <p className="category">{skripsi.category===1 ? <>Artificial Intelligence</> : skripsi.category===2 ? <>Sistem informasi</> : skripsi.category===3 ? <>Jaringan Komputer</> : <></> }</p>
          <p>{skripsi.name}</p>
          {skripsi.keywords? <i>kata kunci: {skripsi.keywords}</i> : <></>}
        </div>
        <div className="col-2 float-right">
          <h5 className="float-right">{skripsi.published_year}</h5>
        </div> 
      </div>
    </div>
  )
}