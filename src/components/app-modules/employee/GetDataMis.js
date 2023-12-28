import React, { useState } from "react";
import { fetchEmployeeDataFromMis } from "../../../lib/fetch";
import { submit } from "../../../lib/submit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal({ show, onHide, data, updateFormData }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    is_superuser: false,
    is_staff: true,
    is_active: true,
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    shift_id: "",
    image: "",
    group_id: "",
    department: "",
    designation: "",
  });

  const [employeeId, setEmployeeId] = useState("");

  const checkDesignationExists = (designation) => {
    const exists = data?.designations.some(
      (item) => item.designation.toLowerCase() === designation.toLowerCase()
    );

    return exists;
  };

  const checkDepartmentExists = (department) => {
    const exists = data?.departments.some(
      (item) => item.department.toLowerCase() === department.toLowerCase()
    );

    return exists;
  };

  const handleButtonClick = async () => {
    // console.log(data?.designations);
    // return;
    try {
      // Call API to get employee data based on the entered ID
      const employeeData = await fetchEmployeeDataFromMis(employeeId);
      // console.log(employeeData);
      // return;

      if (employeeData) {
        setFormData((prev) => ({
          ...prev,
          employee_id: employeeData?.employee_id || "",
          is_superuser: employeeData?.employee_type === "user" || false,
          is_staff: employeeData?.employee_type === "user" || false,
          is_active: employeeData?.is_active === true || false,
          username: employeeData?.username || "",
          email: employeeData?.email || "",
          phone_number: employeeData?.phone_number || "",

          // shift_id: employeeData?.shift_id || "",
          // image: employeeData?.image || "",
          // group_id: employeeData?.employee_id || "",
          // department: employeeData?.employee_id || "",
          // designation: employeeData?.employee_id || "",
        }));

        // const designationExists = checkDesignationExists(
        //   employeeData?.designation
        // );

        // if (!designationExists) {
        //   const response = await submit("/designation/", {
        //     designation:
        //       employeeData?.designation.charAt(0).toUpperCase() +
        //       employeeData?.designation.slice(1),
        //     description: "",
        //   });
        // } else {
        // }

        // const departmentExists = checkDepartmentExists(
        //   employeeData?.department
        // );

        // if (!departmentExists) {
        //   const response = await submit("/department/", {
        //     department:
        //       employeeData?.department.charAt(0).toUpperCase() +
        //       employeeData?.department.slice(1),
        //     description: "",
        //   });
        // } else {
        // }
      }

      updateFormData(formData);
    } catch (error) {
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
        updateFormData={onDataReceived}
      />
    </>
  );
}

export default App;
