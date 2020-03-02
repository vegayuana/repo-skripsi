import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Routes from './Routes'

import Nav from './components/Nav'
import Footer from './components/Footer'

import bg from './icons/bg.webp'
import './styles/page.css'
import store from './store'
import 'typeface-oswald'

export class App extends Component {
  componentDidMount(){
    const elem = document.getElementById('startingLoader')
    elem.remove()
  }
  render() {
    return (
      <> 
      <Provider store={store}>
        <Router>
          <Nav/>
          <div className="alert alert-secondary alert-offline" id="alert-offline" role="alert">
            Anda sedang offline
          </div>
          <img src={bg} alt="Logo" className="bg"/>
          <div className="fullscreen">
            <Routes/>
          </div>
          <Footer/>
        </Router>
      </Provider>
      </>
    )
  }
}
export default App
