import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Get Data From MIS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Enter Employee ID
          </label>
          <input
            type="text"
            className="form-control form_border_focus"
            id=""
            placeholder="Enter Employee ID "
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit" className="rounded-1 theme_color border-0">
            submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        className="mb-3 rounded-1 theme_color border-0 font_14"
        onClick={() => setModalShow(true)}
      >
        Data From MIS
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;
