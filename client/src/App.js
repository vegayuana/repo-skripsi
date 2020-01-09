import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Main from './pages/Main'
import Upload from './pages/Upload'
import SkripsiDetail from './pages/SkripsiDetail'
import Register from './pages/Register'
import Footer from './components/Footer'
import bg1 from './icons/bg.png'
import './styles/page.css'
import VerifikasiAkun from './pages/VerifikasiAkun'
import Admin from './pages/Admin'
import Profile from './pages/Profile'

export class App extends Component {
  render() {
    return (
      <>
      <div className="fullscreen">
      <Router>
        <Nav/>
        <img src={bg1} alt="Logo" className="bg1"/>
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/register' component={Register}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/skripsi-detail' component= {SkripsiDetail}/>
          <Route path='/upload' component={Upload}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/verifikasi-akun' component={VerifikasiAkun}/>
        </Switch>
      </Router>
      </div>
      <Footer></Footer>
      </>
    )
  }
}
export default App
