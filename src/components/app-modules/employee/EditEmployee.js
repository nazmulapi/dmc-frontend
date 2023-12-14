"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { submit } from "../../../lib/submit";

function MyVerticallyCenteredModal(props) {
  // console.log(props.employee.is_active);

  const [formValues, setFormValues] = useState({
    shift_id: props.employee.shift_id,
    is_active: Boolean(props.employee.is_active),
  });

  // useEffect(() => {
  //   setFormValues();
  // }, []);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: shifts,
    error: shiftsFetchError,
    isLoading: shiftsFetchIsLoading,
  } = useSWR(`/shift/`, fetcher, {
    errorRetryCount: 2,
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // console.log(formValues);

    if (
      !formValues.shift_id ||
      (typeof formValues.shift_id === "string" && !formValues.shift_id.trim())
    ) {
      newErrors.shift_id = "Shift ID is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleInputChange = (e) => {
    // e.preventDefault();
    setSuccess("");

    // const { name, value } = e.target;
    const { name, value, type, files } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    // console.log("Form Value: ", formValues);
    // console.log("Error: ", errors);

    if (valid) {
      setIsLoading(true);

      const response = await submit(
        `/employee/${props.employee.employee_id}/`,
        formValues
      );

      // console.log(response);

      if (response?.employee_id) {
        setTimeout(() => {
          setSuccess("Employee updated successfully");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess("Something went wrong!");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      }
    }
  };

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
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Select
            // aria-label="Default select example"
            // className="form_border_focus mb-3"
            className={classEase(
              "form-select form-control rounded-1 form_border_focus",
              errors.shift_id && "is-invalid"
            )}
            aria-label="Default select example"
            name="shift_id"
            value={formValues.shift_id}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="">Select Shift</option>

            {shifts &&
              shifts.map((s) => (
                <option key={s.shift_id} value={s.shift_id}>
                  {s.shift_beginning} - {s.shift_end}
                </option>
              ))}
          </Form.Select>
          {errors.shift_id && (
            <div className="invalid-feedback">{errors.shift_id}</div>
          )}

          <label htmlFor="activeStatus">Active</label>

          {console.log(formValues.is_active)}
          <input
            id="activeStatus"
            type="checkbox"
            name="is_active"
            checked={formValues.is_active}
            onChange={(e) => handleInputChange(e)}
          />

          {success && success !== "" && (
            <div className="success-feedback mb-3">{success}</div>
          )}

          <Button
            type="submit"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              isLoading ? "loading" : ""
            )}
          >
            Submit
            {isLoading && (
              <div className="spinner">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button>Edit</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function EditEmployee({ employee }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setModalShow(true);
        }}
        className="bg-transparent border-0 p-0 m-0"
      >
        <FaRegEdit color="#585858" />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        employee={employee}
      />
    </>
  );
}

export default EditEmployee;
