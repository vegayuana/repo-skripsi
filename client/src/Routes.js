import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import EmailVerification from './pages/EmailVerification'
import SkripsiDetail from './pages/SkripsiDetail'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import ReUpload from './pages/ReUpload'
import UserForum from './pages/UserForum'
import Admin from './pages/admin/Admin'
import AccountVerification from './pages/admin/AccountVerification'
import SkripsiVerification from './pages/admin/SkripsiVerification'
import ForumList from './pages/admin/ForumList'
import AdminForum from './pages/admin/AdminForum'

export default function Routes() {
  return (
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
      <Route path='/forum-list' component={ForumList} />
      <Route path='/admin-forum/:id' component={AdminForum} />
      <Route path='/user-forum' component={UserForum} />
      <Route path='/forgot' component={Forgot}/>
      <Route path='/email-verification/:id' component={EmailVerification}/>
    </Switch>
  )
}
