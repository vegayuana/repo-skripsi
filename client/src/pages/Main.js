import React from 'react'
import Search from '../components/Search'
import Content from '../components/Content'
import '../styles/page.css'
import bg2 from '../icons/book.png'

function Main() {
  return (
    <div>
      <img src={bg2} alt="Logo" className="bg2"/>
      <Search></Search>
      <Content></Content>
    </div>
  )
}

export default Main

