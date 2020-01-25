import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ProfileInfo from '../components/ProfileInfo'
import SkripsiStatus from '../components/SkripsiStatus'
import {scrollToTop} from '../helpers/autoScroll'

export class Profile extends Component {
  state={
    user:{},
    isLoaded:false,
    menu1:true,
    style1:{
      backgroundColor:'#05386B',
      zIndex: '1'
    },
    style2:{
      backgroundColor:'#6c757d',
      zIndex: '0'
    }
  }
  selectMenu = (e)=>{
    let {style1, style2, menu1} = this.state
    if(e.target.id==='profile' || e.target.id==='skripsi'){
      let styleTemp= style1
      this.setState({
        menu1:!menu1,
        style1:style2,
        style2:styleTemp
      })
    }
  }
  componentDidMount(){
    scrollToTop()
  }
  render() {
    let { style1, style2 } = this.state
    if (!localStorage.getItem('token')){
      return <Redirect to={'/'} />
    }
    return (
      <div className=''>
        <div className='row main-box'>
          <div className='col-md-12'>
            <div className='ribbon' id='profile' onClick={this.selectMenu} style={style1}>Profil</div>
            <div className='ribbon ribbon-right' id='skripsi' onClick={this.selectMenu} style={style2}>Skripsi</div>
            <div className='line'></div>
            <div className='profile-box'>
              {this.state.menu1===true?
              <ProfileInfo></ProfileInfo> :
              <SkripsiStatus></SkripsiStatus> 
              }
            </div>
          </div>         
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    token : state.auth.token,
    role: state.auth.role
  }
}
export default connect(mapStateToProps, null)(Profile)
