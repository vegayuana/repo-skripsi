import React, { Component } from 'react'

const initialState = {
  file : [
    {
      id:1, judul: "judul1"
    },{
      id:2, judul: "judul2"
    },{
      id:3, judul: "judul3"
    }
  ]
} 
export class List extends Component {
  // componentDidMount(){
  //   this.props.getItems();
  // }
  render() {
    return (
      <div className="list row">
        <div className="col-sm-10 ">
          <b><h5>Judul</h5></b>
          <p>Penulis</p>
          <p>Kategori</p>
        </div>
        <div className="col-sm-2 float-right">
          <h5 className="float-right">2016</h5>
        </div> 
      </div>
    )
  }
}

// List.propTypes ={
//   getItems: PropTypes.func.isRequired,
//   file:PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//   file: state.file
// })

// export default connect(mapStateToProps, { getItems })(List);
export default List;