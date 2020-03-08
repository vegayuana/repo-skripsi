import React from 'react'
import { Link } from 'react-router-dom'
import List from './List'

const ListCard = function(props) {
  let { isLoaded, skripsi} = props
  console.log('render list')
  return (
    <>
      { !isLoaded ?
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>  
        :  skripsi.length===0 ? <div className="text-center">No Data Found</div> :
        skripsi.map((item, i) =>
          <Link to={'/skripsi-detail/'+item.id} key={i}>
            <List skripsi={item}></List>
          </Link>
        )
      }
      </>
  )
}
export default React.memo(ListCard)