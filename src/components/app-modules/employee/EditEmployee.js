"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";

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
          Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select
            aria-label="Default select example"
            className="form_border_focus mb-3"
          >
            <option>Status</option>
            <option value="1">active</option>
            <option value="2">inactive</option>
          </Form.Select>

          <Button className="theme_color float-end border-0" type="submit" >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button>Edit</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function EditEmployee() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => setModalShow(true)}
        className="bg-transparent border-0 p-0 m-0"
      >
        <FaRegEdit color="white" />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default EditEmployee;
