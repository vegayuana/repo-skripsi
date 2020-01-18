import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileInfo from '../components/ProfileInfo'
import SkripsiStatus from '../components/SkripsiStatus'

export class Profile extends Component {
  state={
    user:{},
    isLoaded:false,
    menu1:true,
    style1:{
      backgroundColor:'#379683',
      zIndex: '1'
    },
    style2:{
      backgroundColor:'#05386B',
      zIndex: '0'
    }
  }
  // getData= ()=>{
  //   axios({
  //     method: 'get',
  //     url: `http://localhost:3000/user/profile/`,
  //     headers: {
  //       Authorization: this.props.token
  //     } 
  //   })
  //   .then(res=>{
  //     this.setState({ 
  //       user: res.data,
  //       isLoaded: true
  //     })
  //   })
  // }
  componentDidMount(){
    // this.getData()
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
  render() {
    let { style1, style2 } = this.state
    return (
      <div className=''>
        <div className='row main-box'>
          <div className='col-md-12'>
            <div className='ribbon' id='profile' onClick={this.selectMenu} style={style1}>Profile</div>
            <div className='ribbon ribbon-right' id='skripsi' onClick={this.selectMenu} style={style2}>Skripsi</div>
            <div className='line'></div>
            <div className='profile-box'>
              {this.state.menu1===true?
              <ProfileInfo></ProfileInfo>:
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
