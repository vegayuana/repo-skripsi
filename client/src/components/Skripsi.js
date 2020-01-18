import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function Skripsi(props) {
  let {skripsi} = props
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="list-box" onClick={handleShow}>
        <div className="list row">
          <div className="col-sm-10">
            <b><h5>{skripsi.title}</h5></b>
            <p>{skripsi.name}</p>
            <p><i>{skripsi.category}</i></p>
          </div>
          <div className="col-sm-2 float-right">
            <h5 className="float-right">{skripsi.published_year}</h5>
          </div> 
        </div>
      </div>
      {/* Pop Up */}
      <Modal show={showModal} onHide={handleClose} centered>
        <div className="line" style={{backgroundColor:'#5cdb95'}}></div>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Log in to get full access</Modal.Body>
      </Modal>
    </div>
  )
}
