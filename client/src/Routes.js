import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => null
const Main = Loadable({
  loader: () => import('./pages/Main'),
  loading:Loading
})
const Register = Loadable({
  loader: () => import('./pages/Register'),
  loading:Loading
})
const SkripsiDetail = Loadable({
  loader: () => import('./pages/SkripsiDetail'),
  loading:Loading
})
const Profile = Loadable({
  loader: () => import('./pages/Profile'),
  loading:Loading
})
const Upload = Loadable({
  loader: () => import('./pages/Upload'),
  loading:Loading
})
const ReUpload = Loadable({
  loader: () => import('./pages/ReUpload'),
  loading:Loading
})
const Admin = Loadable({
  loader: () => import('./pages/admin/Admin'),
  loading:Loading
})
const  AccountVerification = Loadable({
  loader: () => import('./pages/admin/AccountVerification'),
  loading:Loading
})
const SkripsiVerification = Loadable({
  loader: () => import('./pages/admin/SkripsiVerification'),
  loading:Loading
})

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
    </Switch>
  )
}
