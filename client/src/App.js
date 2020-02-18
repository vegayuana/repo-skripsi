import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import HttpsRedirect from 'react-https-redirect';
import Routes from './Routes'

import Nav from './components/Nav'
import Footer from './components/Footer'

import bg from './icons/bg.webp'
import './styles/page.css'
import store from './store'

export class App extends Component {
  componentDidMount(){
    const elem = document.getElementById('startingLoader');
    window.onload = () => {
      if (elem) {
        elem.remove();
      }
    }
  }
  render() {
    return (
      <> 
      <Provider store={store}>
      <HttpsRedirect>
        <Router>
          <div className="alert alert-secondary alert-offline" id="alert-offline" role="alert">
            Anda sedang offline
          </div>
          <Nav setUser={this.setUser}/>
          <img src={bg} alt="Logo" className="bg"/>
          <div className="fullscreen">
          <Routes/>
          </div>
          <Footer></Footer>
        </Router>
        </HttpsRedirect>
      </Provider>
      </>
    )
  }
}
export default App
