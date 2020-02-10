import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import List from './List'

const ListCard = function(props) {
  let { isLoaded, skripsi} = props
  let token = useSelector(state => state.auth.token)
  console.log('render list')
  return (
    <>
      { !isLoaded ?
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>  
        :  skripsi.length===0 ? <div style={{textAlign:'center'}}>No Data Found</div> :
        skripsi.map((item, i) =>
          !token ? <List skripsi={item} key={i}></List> : 
          <Link to={'/skripsi-detail/'+item.id} key={i}>
            <List skripsi={item}></List>
          </Link>
        )
      }
      </>
  )
}
export default React.memo(ListCard)