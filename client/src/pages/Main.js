import React, {useEffect }from 'react'
import Content from '../components/Content'
import '../styles/page.css'
import bg1 from '../icons/bg1.webp'
import { scrollToTop } from '../helpers/autoScroll'

function Main() {
  useEffect(() => {
    scrollToTop()
  })
  return (
    <div>
      <img src={bg1} alt="Logo" className="bg1"/>
      <Content></Content>
    </div>
  )
}

export default Main