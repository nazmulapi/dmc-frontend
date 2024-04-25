"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { update } from "../../../lib/submit";

const EditModal = ({ show, onHide, item, mutate }) => {
  const [formValues, setFormValues] = useState({
    id: item.shift_id,
    shift_name: item.shift_name,
    shift_beginning: item.shift_beginning,
    shift_end: item.shift_end,
    shift_tardiness_minutes: item.shift_tardiness_minutes,
    is_active: item.is_active,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSuccess("");
  }, [show]);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      id: item.shift_id,
      shift_name: item.shift_name,
      shift_beginning: item.shift_beginning,
      shift_end: item.shift_end,
      shift_tardiness_minutes: item.shift_tardiness_minutes,
      is_active: item.is_active,
    }));
  }, [item]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.shift_name?.trim()) {
      newErrors.shift_name = "Name is required";
      valid = false;
    }

    if (!formValues?.shift_beginning?.trim()) {
      newErrors.shift_beginning = "Shift beginning time is required";
      valid = false;
    }

    if (formValues?.shift_tardiness_minutes <= 0) {
      newErrors.shift_tardiness_minutes =
        "Shift tardiness minutes might be more than 0";
      valid = false;
    }

    if (!formValues?.shift_end?.trim()) {
      newErrors.shift_end = "Shift end time is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleChange = (e) => {
    setSuccess("");

    const { name, type, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.checked,
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

      const response = await update(`/shift/${item.shift_id}/`, formValues);

      // console.log(response);

      if (response?.shift_id) {
        setTimeout(() => {
          // setItem((prevData) =>
          //   prevData.map((i) => (i.id === formValues.id ? formValues : i))
          // );
          mutate();
          setSuccess("Shift updated successfully");
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
      // {...props}
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Shift</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Row>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Shift Name
              </label>
              <input
                type="text"
                className={`form-control rounded-1 form_border_focus ${
                  errors.shift_name ? "is-invalid" : ""
                }`}
                placeholder="Enter shift name"
                name="shift_name"
                value={formValues.shift_name}
                onChange={handleChange}
                // readOnly
              />
              {errors.shift_name && (
                <div className="invalid-feedback">{errors.shift_name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Start Time <span className="text-danger"> *</span>
              </label>
              <input
                type="time"
                className={`form-control rounded-1 form_border_focus ${
                  errors.shift_beginning ? "is-invalid" : ""
                }`}
                name="shift_beginning"
                id=""
                placeholder="Enter Start Time"
                value={formValues.shift_beginning}
                onChange={handleChange}
                // step="1"
              />
              {errors.shift_beginning && (
                <div className="invalid-feedback">{errors.shift_beginning}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                End Time<span className="text-danger"> *</span>
              </label>
              <input
                type="time"
                className={`form-control rounded-1 form_border_focus ${
                  errors.shift_end ? "is-invalid" : ""
                }`}
                name="shift_end"
                id=""
                placeholder="Enter Start Time"
                value={formValues.shift_end}
                onChange={handleChange}
                // step="1"
              />
              {errors.shift_end && (
                <div className="invalid-feedback">{errors.shift_end}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Shift Tardiness Minutes<span className="text-danger"> *</span>
              </label>
              <input
                type="number"
                className={`form-control rounded-1 form_border_focus ${
                  errors.shift_tardiness_minutes ? "is-invalid" : ""
                }`}
                name="shift_tardiness_minutes"
                id=""
                placeholder="Enter Start Time"
                value={formValues.shift_tardiness_minutes}
                onChange={handleChange}
                // step="1"
              />
              {errors.shift_tardiness_minutes && (
                <div className="invalid-feedback">
                  {errors.shift_tardiness_minutes}
                </div>
              )}
            </div>

            <div className="mb-2">
              <input
                id="shiftStatus"
                type="checkbox"
                name="is_active"
                checked={formValues.is_active}
                // value={formValues.is_active}
                onChange={(e) => handleChange(e)}
                className="form-check-input"
              />
              <label className="mb-2 ms-2" htmlFor="shiftStatus">
                Active
              </label>
            </div>
          </Row>
          {/* <button className="button-16 fw-semibold" role="button">
            <span className="text">Create</span>
          </button> */}

          {success && success !== "" && (
            <div className="success-feedback mb-3">{success}</div>
          )}

          <Button
            type="submit"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              isLoading ? "loading" : ""
            )}
            disabled={isLoading}
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
};

const Edit = ({ item, mutate }) => {
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

      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        mutate={mutate}
      />
    </>
  );
};

export default Edit;
