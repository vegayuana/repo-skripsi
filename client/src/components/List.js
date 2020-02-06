import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function List(props) {
  let {skripsi} = props
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="list-box" onClick={handleShow}>
        <div className="list row">
          <div className="col-10">
            <b><h5>{skripsi.title}</h5></b>
            <p className="category">{skripsi.category===1 ? <>Artificial Intelligence</> : skripsi.category===2 ? <>Sistem informasi</> : skripsi.category===3 ? <>Jaringan Komputer</> : <></> }</p>
            <p>{skripsi.name}</p>
            {skripsi.keywords? <i>kata kunci: {skripsi.keywords}</i> : <></>}
          </div>
          <div className="col-2 float-right">
            <h5 className="float-right">{skripsi.published_year}</h5>
          </div> 
        </div>
      </div>
      {/* Pop Up */}
      <Modal className="list-skripsi" show={showModal} onHide={handleClose} centered>
        <div className="line" style={{backgroundColor:'#5cdb95'}}></div>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Log in to get full access</Modal.Body>
      </Modal>
    </div>
  )
}