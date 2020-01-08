import React, { Component } from 'react'

export class Unggah extends Component {
  state={
    datas:[]
  }
  submit = (e) =>{
    e.preventDefault();
    
    let datas = this.state.datas;
    let judul = this.refs.judul.value;
    let penulis = this.refs.penulis.value;
    let subjek = this.refs.subjek.value;
    let tahun = this.refs.tahun.value;
    let abstrak = this.refs.abstrak.value;
    let file = this.refs.file.value;

    let data = {
        judul, penulis, subjek, tahun, abstrak, file
      }
      datas.push(data);

    this.setState({
      datas: datas,
    });
    console.log(datas)
  }
  render() {
    return (
      <div>
      <div className="row no-margin">
        <div className="register-box">
          <h3>Unggah</h3>
          <form >
            <div className="form-group">
              <label for="inputJudul">Judul </label>
                <input type="text" ref="judul" className="form-control" id="idjudul" placeholder="Input Judul"/>
              </div>
            <div className="form-group">
              <label for="inputPenulis">Penulis</label>
              <input type="text" ref="penulis" className="form-control" id="idpenulis" placeholder="Input Penulis"/>
            </div>
            <div className="form-group">
              <label for="inputSubjek">Subjek</label>
              <input type="text" ref="subjek" className="form-control" id="idsubjek" placeholder="Input Subjek"/>
            </div>
            <div className="form-group">
              <label for="input">Tahun</label>
              <input type="text" ref="tahun" className="form-control" id="idtahun" placeholder="Input Tahun"/>
            </div>
            <div className="form-group">
            <label for="input">Abstrak</label>
              <input type="text" ref="abstrak" className="form-control" id="idabstrak" placeholder="Input Abstrak"/>
            </div>
            <div className="form-group">
              <label for="inputFile">File</label>
              <input type="file" ref="file" className="form-control-file" id="idfile"/>
            </div> 
            <button type="submit" className="btn btn-primary" onClick={(e)=>this.submit(e)}>Submit</button>
          </form>
        </div>
        <div className="col-xl-3"></div>
      </div>
      </div>
    )
  }
}

export default Unggah
