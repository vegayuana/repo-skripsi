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
import 'typeface-lato'
import ChangePage from './helpers/ChangePage'

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
          <ChangePage />
          <Nav/>
          <div className="alert alert-secondary alert-offline" id="alert-offline" role="alert">
            Anda sedang offline
          </div>
          
          <img src={bg} alt="Logo" className="bg"/>
          <div className="fullscreen">
            <Routes/>
          </div>
          <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false">
            <div class="toast-header">
              <strong class="mr-auto">Repo-Skripsi</strong>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              Anda sedang offline
            </div>
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
