import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Footer from './components/Footer'
import Main from './pages/Main'
import Register from './pages/Register'
import SkripsiDetail from './pages/SkripsiDetail'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import Admin from './pages/admin/Admin'
import AccountVerification from './pages/admin/AccountVerification'
import SkripsiVerification from './pages/admin/SkripsiVerification'
import bg from './icons/bg.webp'
import './styles/page.css'

import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
import store from './store'
import ReUpload from './pages/ReUpload'
// import configStore from './store'

// const { store, persistor} = configStore()

export class App extends Component {
  render() {
    return (
      <> 
      <Provider store={store}>
        <Router>
          {/* <PersistGate persistor={persistor}> */}
          <div className="alert alert-secondary alert-offline" role="alert">
            You are offline
          </div>
          <Nav setUser={this.setUser}/>
          <img src={bg} alt="Logo" className="bg"/>
          <div className="fullscreen">
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/register' component={Register}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/skripsi-detail/:id' component= {SkripsiDetail}/>
            <Route path='/upload' component={Upload}/>
            <Route path='/reupload' component={ReUpload}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/account-verification' component={AccountVerification} />
            <Route path='/skripsi-verification' component={SkripsiVerification} />
          </Switch>
          </div>
          {/* </PersistGate> */}
          <Footer></Footer>
        </Router>
      </Provider>
      </>
    )
  }
}
export default App
