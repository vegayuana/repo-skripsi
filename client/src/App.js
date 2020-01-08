import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Main from './pages/Main'
import Unggah from './pages/Unggah'
import DetailSkripsi from './pages/DetailSkripsi'
import Register from './pages/Register'
import Footer from './components/Footer'
import bg1 from './icons/bg.png'
import './styles/page.css'
import VerifikasiAkun from './pages/VerifikasiAkun'
import Admin from './pages/Admin'

// import { Provider } from 'react-redux';
// import store from './store'

export class App extends Component {
  render() {
    return (
      <>
      {/* <Provider store={store}> */}
      <div className="fullscreen">
      <Router>
        <Nav/>
        <img src={bg1} alt="Logo" className="bg1"/>
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/unggah' component={Unggah}/>
          <Route path='/detail-skripsi' component={DetailSkripsi}/>
          <Route path='/register' component={Register}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/verifikasi-akun' component={VerifikasiAkun}/>
        </Switch>
      </Router>
      </div>
      <Footer></Footer>
      {/* </Provider> */}
      </>
    )
  }
}
export default App
