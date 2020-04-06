import React, {useEffect }from 'react'
import Content from '../components/Content'
import '../styles/page.css'
import bg1 from '../icons/bg1.png'

function Main() {
  return (
    <div>
      <img src={bg1} alt="Logo" className="bg1"/>
      <Content></Content>
    </div>
  )
}

export default Main