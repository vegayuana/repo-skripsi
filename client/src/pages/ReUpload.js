import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { scrollToTop } from "../helpers/autoScroll";
import { Spinner } from "react-bootstrap";

export class ReUpload extends Component {
  initialState = {
    skripsi: {},
    isLoaded: false,
    title: "",
    titleAlert: "initial",
    year: "",
    yearAlert: "initial",
    abstract: "",
    abstractAlert: "initial",
    category: "",
    keywords: "",
    file: null,
    message: "",
    status: ""
  };
  state = this.initialState;
  submit = e => {
    e.preventDefault();
    console.log(this.state);
    let { title, year, abstract, category, keywords } = this.state;
    let { file } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("year", year);
    formData.append("abstract", abstract);
    formData.append("category", category);
    formData.append("keywords", keywords);
    axios({
      method: "put",
      // baseURL: 'http://localhost:5000',
      url: `/user/reupload/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: this.props.token
      }
    })
      .then(res => {
        this.refs.uploadForm.reset();
        this.setState({
          message: res.data.message,
          status: res.data.status
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            message: err.response.data.message,
            status: err.response.data.status
          });
        }
      });
  };
  handleInput = e => {
    console.log(e.target.id);
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
    if (e.target.id === "title") {
      this.setState({
        titleAlert: e.target.value
      });
    }
    if (e.target.id === "year") {
      this.setState({
        yearAlert: e.target.value
      });
    }
    if (e.target.id === "abstract") {
      this.setState({
        abstractAlert: e.target.value
      });
    }
  };
  handleFile = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  checkSkripsi = () => {
    axios({
      method: "get",
      // baseURL: "http://localhost:5000",
      url: `/user/skripsi/`,
      headers: {
        Authorization: this.props.token
      }
    })
      .then(res => {
        this.setState({
          skripsi: res.data,
          isLoaded: true
        });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      });
  };
  componentDidMount() {
    this.checkSkripsi();
    scrollToTop();
  }
  render() {
    let {
      message,
      status,
      isLoaded,
      skripsi,
      file,
      title,
      year,
      abstract,
      titleAlert,
      yearAlert,
      abstractAlert,
      keywords
    } = this.state;
    console.log("render upload", skripsi.is_approved);
    if (!localStorage.getItem("token")) {
      return <Redirect to={"/"} />;
    }
    return (
      <>
        {!isLoaded ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <div className="row no-margin">
            <div className="upload-box">
              <h3>Unggah Ulang</h3>
              {skripsi.is_approved !== 0 ? (
                <></>
              ) : status === 200 ? (
                <>
                  <div className="alert alert-success" role="alert">
                    <strong>{this.state.message}</strong>
                  </div>
                  <Link to="/profile">
                    <button className="btn btn-primary">Selesai</button>
                  </Link>
                </>
              ) : (
                <>
                  <form ref="uploadForm">
                    <div className="form-group">
                      <label>Judul *</label>
                      <input
                        type="text"
                        id="title"
                        onBlur={this.handleInput}
                        className="form-control"
                        placeholder="Judul Skripsi"
                      />
                      {titleAlert === "initial" ? (
                        <></>
                      ) : !titleAlert ? (
                        <div className="alert alert-danger" role="alert">
                          <strong>Judul tidak boleh kosong</strong>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Tahun *</label>
                      <input
                        type="number"
                        id="year"
                        onBlur={this.handleInput}
                        className="form-control"
                        placeholder="Tahun Publikasi Skripsi"
                      />
                      {yearAlert === "initial" ? (
                        <></>
                      ) : year.length !== 4 || year < 2000 || year > 2100 ? (
                        <div className="alert alert-danger" role="alert">
                          <strong>Tahun harus diisi dengan benar</strong>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Abstrak *</label>
                      <textarea
                        id="abstract"
                        onBlur={this.handleInput}
                        className="form-control"
                        placeholder="Input Abstrak"
                      />
                      {abstractAlert === "initial" ? (
                        <></>
                      ) : !abstractAlert ? (
                        <div className="alert alert-danger" role="alert">
                          <strong>Abstrak tidak boleh kosong</strong>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="form-group">
                      <label>File * (Maks 50mb)</label>
                      <input
                        type="file"
                        ref="file"
                        onChange={this.handleFile}
                        className="form-control-file"
                        id="file"
                        accept=".pdf"
                      />
                      {!file ? (
                        <></>
                      ) : file.type === "application/pdf" ? (
                        <></>
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          <strong>File must be PDF</strong>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Bidang Minat Skripsi</label>
                      <select
                        className="custom-select"
                        onChange={this.handleInput}
                        id="category"
                      >
                        <option value="">Bidang Minat</option>
                        <option value="1">Artificial Intelligence</option>
                        <option value="2">Sistem Informasi</option>
                        <option value="3">Jaringan Komputer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Kata Kunci </label>
                      <p style={{ fontSize: "0.8rem" }}>
                        Input 1-5 kata kunci yang berkaitan dengan skripsi
                        (pisahkan dengan koma)
                      </p>
                      <input
                        type="text"
                        id="keywords"
                        onChange={this.handleInput}
                        className="form-control"
                        placeholder="Kata Kunci"
                      />
                      {keywords.length < 255 ? (
                        <></>
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          <strong>Kata kunci terlalu banyak</strong>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={e => this.submit(e)}
                      disabled={
                        !title ||
                        !abstract ||
                        year.length !== 4 ||
                        year < 2000 ||
                        year > 2100 ||
                        !file ||
                        !file.type === "application/pdf" ||
                        keywords.length >= 255
                      }
                    >
                      Submit
                    </button>
                    {message === "" ? (
                      <></>
                    ) : (
                      <div className="alert alert-danger" role="alert">
                        <strong>{this.state.message}</strong>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    role: state.auth.role
  };
};
export default connect(mapStateToProps, null)(ReUpload);
