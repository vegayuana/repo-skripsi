import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './Routes'

import Nav from './components/Nav'
import Footer from './components/Footer'

import bg from './icons/bg.png'
import './styles/page.css'
import {store, persistor} from './store'
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
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
      </>
    )
  }
}
export default App
