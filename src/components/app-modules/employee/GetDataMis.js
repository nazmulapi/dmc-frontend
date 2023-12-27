import React, { useState } from "react";
import { fetchEmployeeDataFromMis } from "../../../lib/fetch";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, data }) {
  const [employeeId, setEmployeeId] = useState("");

  const checkDesignationExists = (designation) => {
    const exists = data?.designations.some(
      (item) => item.designation.toLowerCase() === designation.toLowerCase()
    );

    return exists;
  };

  const handleButtonClick = async () => {
    // console.log(data?.designations);
    // return;
    try {
      // Call API to get employee data based on the entered ID
      const employeeData = await fetchEmployeeDataFromMis(employeeId);
      if (employeeData) {
        const hasDesignation = checkDesignationExists(
          employeeData?.designation
        );
        console.log(hasDesignation);
      }

      return;

      // Check if the designation exists in your list
      const designationExists = checkDesignationExists(
        employeeData.designation
      );

      if (!designationExists) {
        // Call API to create the designation
        await createDesignation(employeeData.designation);
      }

      // Call API again to get the updated employee data
      const updatedEmployeeData = await fetchEmployeeData(employeeId);

      // Pass the received employee data back to the parent component
      onDataReceived(updatedEmployeeData);
    } catch (error) {
      // Handle errors
      console.error("Error fetching or updating employee data:", error);
    }
  };

  return (
    <Modal
      // {...props}
      show={show}
      onHide={onHide}
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
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="rounded-1 theme_color border-0"
            onClick={handleButtonClick}
          >
            submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function App({ onDataReceived, data }) {
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
        data={data}
      />
    </>
  );
}

export default App;
