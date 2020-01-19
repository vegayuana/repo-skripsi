import React from 'react'
import Content from '../components/Content'
import '../styles/page.css'
import bg2 from '../icons/book.png'

function Main() {
  return (
    <div>
      <img src={bg2} alt="Logo" className="bg2"/>
      <Content></Content>
    </div>
  )
}

export default Main

