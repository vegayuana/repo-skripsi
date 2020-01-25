import React, {useEffect }from 'react'
import Content from '../components/Content'
import '../styles/page.css'
import bg2 from '../icons/book.png'
import {scrollToTop} from '../helpers/autoScroll'

function Main() {
  useEffect(() => {
    scrollToTop()
  })
  console.log('render main')
  return (
    <div>
      <img src={bg2} alt="Logo" className="bg2"/>
      <Content></Content>
    </div>
  )
}

export default Main

